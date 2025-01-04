import { Event, Selection } from '../types/interfaces';
import events from '../data/events';

const selections: Selection[] = [];

export function getAllEvents(): Event[] {
	return events;
}

export function addSelection(
	eventId: number,
	selectedOutcome: 'HOME' | 'DRAW' | 'AWAY'
): Selection[] {
	const event = events.find((e) => e.id === eventId);
	if (!event) {
		throw new Error("Event not found");
	}

	const selection: Selection = {
		eventId,
		selectedOutcome,
		eventDetails: event,
	};

	selections.push(selection);
	return selections;
}

export function getSelectionHistory(): Selection[] {
	return selections;
}
