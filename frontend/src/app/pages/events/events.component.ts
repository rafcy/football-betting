import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { EventListComponent } from '../../components/event-list/event-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { CustomConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { environment } from '../../../environments/environment';
import { Event } from '../../../types/interfaces';

@Component({
    selector: 'app-events',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        CommonModule,
        EventListComponent,
        LoadingComponent,
        PaginationComponent,
        ToastComponent,
        CustomConfirmationDialogComponent,
    ],
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
    events: Event[] = [];
    loading: boolean = true;
    errorMessage: string | null = null;
    selectedOutcome: { [key: string]: string } = {};
    currentPage: number = 1;
    itemsPerPage: number = environment.limitPostsPerPage;
    totalPages: number = 0;
    openedConfirmationDialog: boolean = false;
    selectedEventId: number | null = null;
    disabledEvents: Set<number> = new Set();
    selectedOutcomeForDialog: string = '';
    selectedMatchForDialog: string = '';
    @ViewChild('toast') toast!: ToastComponent;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.fetchEvents();
    }

    fetchEvents(): void {
        this.loading = true;
        this.errorMessage = null;

        this.apiService
            .getEvents(this.currentPage, this.itemsPerPage)
            .subscribe({
                next: (response) => {
                    this.events = response.data;
                    this.totalPages = response.totalPages;
                    this.loading = false;

                    if (this.events.length === 0) {
                        this.errorMessage = 'No Events Found. Try again later.';
                        this.toast.message = this.errorMessage;
                        this.toast.type = 'error';
                        this.toast.showToast();
                    }
                },
                error: (err) => {
                    this.loading = false;
                    this.errorMessage =
                        'Failed to load events. Please try again later.';

                    this.toast.message = this.errorMessage;
                    this.toast.type = 'error';
                    this.toast.showToast();
                },
            });
    }

    filterEventById(eventId: number): any | undefined {
        return this.events.find((event) => event.id === eventId);
    }

    changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.fetchEvents();
        }
    }

    onSelectionMade(event: { eventId: number; outcome: string }): void {
        this.openConfirmationDialog(event.eventId, event.outcome);
    }

    openConfirmationDialog(eventId: number, selectedOutcome: string): void {
        if (this.openedConfirmationDialog) {
            return;
        }

        const event = this.filterEventById(eventId);
        if (event) {
            this.selectedOutcomeForDialog = selectedOutcome;
            this.selectedEventId = eventId;
            this.selectedMatchForDialog = `${event.homeTeam} vs ${event.awayTeam}`;
            this.openedConfirmationDialog = true;
        }
    }

    onDialogConfirm(): void {
        if (this.selectedEventId) {
            this.submitSelection(
                this.selectedEventId,
                this.selectedOutcomeForDialog
            );
        }
        this.openedConfirmationDialog = false;
    }

    onDialogCancel(): void {
        this.openedConfirmationDialog = false;
    }

    isDisabled(eventId: number): boolean {
        return this.disabledEvents.has(eventId);
    }

    submitSelection(eventId: number, selectedOutcome: string): void {
        this.selectedOutcome[eventId] = selectedOutcome;

        const selection = {
            eventId: eventId,
            selectedOutcome: selectedOutcome,
        };

        this.apiService.postSelection(selection).subscribe({
            next: () => {
                this.fetchEvents();
                this.toast.message = 'Selection submitted successfully!';
                this.toast.type = 'success';
                this.toast.showToast();
            },

            error: (err) => alert(`Failed to submit: ${err.message}`),
        });
    }
}
