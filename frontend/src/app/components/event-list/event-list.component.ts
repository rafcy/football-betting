import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-event-list',
    standalone: true,
    imports: [NgFor, NgIf, CommonModule, MatRadioModule, MatButtonModule],
    templateUrl: './event-list.component.html',
    styleUrl: './event-list.component.scss',
})
export class EventListComponent {
    @Input() events: any[] = [];
    @Input() selectedOutcome: { [key: number]: string } = {};
    @Input() disabledEvents: Set<number> = new Set();
    @Output() selectionMade = new EventEmitter<{
        eventId: number;
        outcome: string;
    }>();

    isDisabled(eventId: number): boolean {
        return this.disabledEvents.has(eventId);
    }

    onSelection(eventId: number, selectedOutcome: string): void {
        this.selectionMade.emit({ eventId, outcome: selectedOutcome });
    }
}
