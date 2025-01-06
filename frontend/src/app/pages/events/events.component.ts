import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ConfirmationDialogComponent } from '../..//components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EventListComponent } from '../../components/event-list/event-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ToastComponent } from '../../components/toast/toast.component';

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
    ],
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
    history: any[] = [];
    events: any[] = [];
    loading: boolean = true;
    errorMessage: string | null = null;
    selectedOutcome: { [key: string]: string } = {};
    currentPage: number = 1;
    itemsPerPage: number = 5;
    totalPages: number = 0;
    openedConfirmationDialog: boolean = false;
    disabledEvents: Set<number> = new Set();
    @ViewChild('toast') toast!: ToastComponent;

    constructor(private apiService: ApiService, private dialog: MatDialog) {}

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

        this.openedConfirmationDialog = true;

        const event = this.filterEventById(eventId);
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                selection: selectedOutcome,
                match: `${event.homeTeam} vs ${event.awayTeam}`,
            },
            panelClass: 'custom-dialog-container',
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.submitSelection(eventId, selectedOutcome);
            }
            this.openedConfirmationDialog = false;
        });
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
