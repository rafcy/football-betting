import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
	selector: 'app-events',
	standalone: true,
	imports: [
		NgFor,
		NgIf,
		CommonModule,
		FormsModule,
		MatRadioModule,
		MatButtonModule,
		LoadingComponent
	],
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
})
export class EventsComponent {
	events: any[] = [];
	loading: boolean = true;
	errorMessage: string | null = null;
	selectedOutcome: { [key: string]: string } = {};
	currentPage: number = 1;
	itemsPerPage: number = 5;
	totalPages: number = 0;

	constructor(private apiService: ApiService) { }

	ngOnInit(): void {
		this.fetchEvents();
	}

	fetchEvents(): void {
		this.loading = true;
		this.errorMessage = null;

		this.apiService.getEvents(this.currentPage, this.itemsPerPage).subscribe({
			next: (response) => {
				this.events = response.data;
				this.totalPages = response.totalPages;
				this.loading = false;

				if (this.events.length === 0) {
					this.errorMessage = 'No Events Found. Try again later.';
				}
			},
			error: (err) => {
				this.loading = false;
				this.errorMessage = 'Failed to load events. Please try again later.';
			}
		});
	}

	changePage(page: number): void {
		if (page >= 1 && page <= this.totalPages) {
			this.currentPage = page;
			this.fetchEvents();
		}
	}

	submitSelection(eventId: number, selectedOutcome: string): void {
		this.selectedOutcome[eventId] = selectedOutcome;

		const selection = {
			eventId: eventId,
			selectedOutcome: selectedOutcome,
		};

		this.apiService.postSelection(selection).subscribe({
			next: () => alert(`Selection submitted successfully! (${selectedOutcome})`),
			error: (err) => alert(`Failed to submit: ${err.message}`),
		});
	}
}
