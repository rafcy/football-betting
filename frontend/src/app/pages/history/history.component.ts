import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgFor } from '@angular/common';

@Component({
	selector: 'app-history',
	imports: [NgFor],
	standalone: true,
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
	history: any[] = [];

	constructor(private apiService: ApiService) { }

	ngOnInit(): void {
		this.apiService.getHistory().subscribe((data) => {
			this.history = data;
		});
	}
}
