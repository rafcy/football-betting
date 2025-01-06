import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { EventListComponent } from '../../components/event-list/event-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { Event, HistoryEvent } from '../../../types/interfaces';

@Component({
    selector: 'app-history',
    imports: [
        CommonModule,
        LoadingComponent,
        EventListComponent,
        PaginationComponent,
        ToastComponent,
    ],
    standalone: true,
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
    history: Event[] = [];
    loading: boolean = true;
    errorMessage: string | null = null;
    currentPage: number = 1;
    itemsPerPage: number = 5;
    totalPages: number = 0;
    selectedOutcome: { [key: string]: string } = {};
    disabledEvents: Set<number> = new Set();
    @ViewChild('toast') toast!: ToastComponent;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.fetchHistory();
    }

    fetchHistory(): void {
        this.loading = true;
        this.errorMessage = null;

        this.apiService
            .getHistory(this.currentPage, this.itemsPerPage)
            .subscribe({
                next: (response) => {
                    const { events, disabledEvents, selectedOutcome } =
                        this.processHistoryData(response.data);

                    this.history = events;
                    this.disabledEvents = disabledEvents;
                    this.selectedOutcome = selectedOutcome;

                    this.totalPages = response.totalPages;

                    if (this.history.length === 0) {
                        this.errorMessage = 'No History Found.';
                        this.toast.message = this.errorMessage;
                        this.toast.type = 'error';
                        this.toast.showToast();
                    }
                    this.loading = false;
                },
                error: (err) => {
                    this.loading = false;
                    if (err?.message && err?.message.includes('404')) {
                        this.errorMessage = 'No history is found.';
                    } else {
                        this.errorMessage =
                            'Failed to load history. Please try again later.';
                    }
                    this.toast.message = this.errorMessage;
                    this.toast.type = 'error';
                    this.toast.showToast();
                },
            });
    }

    processHistoryData(history: HistoryEvent[]): {
        events: Event[];
        disabledEvents: Set<number>;
        selectedOutcome: { [key: number]: string };
    } {
        const events: Event[] = [];
        const disabledEvents = new Set<number>();
        const selectedOutcome: { [key: number]: string } = {};

        history.forEach((entry) => {
            const { eventId, selectedOutcome: outcome, eventDetails } = entry;

            events.push({
                id: eventDetails.id,
                homeTeam: eventDetails.homeTeam,
                awayTeam: eventDetails.awayTeam,
                odds: eventDetails.odds,
            });

            disabledEvents.add(eventId);

            selectedOutcome[eventId] = outcome;
        });

        return { events, disabledEvents, selectedOutcome };
    }

    changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.fetchHistory();
        }
    }
}
