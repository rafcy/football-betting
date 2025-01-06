import { Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { HistoryComponent } from './pages/history/history.component';

export const routes: Routes = [
	{ path: 'events', component: EventsComponent },
	{ path: 'history', component: HistoryComponent },
	{ path: '**', redirectTo: 'events' }
];

