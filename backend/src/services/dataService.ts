import { Event, Selection } from "../types/interfaces";
import events from "../data/events";

const selections: Selection[] = [];

export function addSelection(
    eventId: number,
    selectedOutcome: "HOME" | "DRAW" | "AWAY"
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

export function getAllEventsWithoutSelection(): Event[] {
    const historyEventIds = new Set(selections.map((entry) => entry.eventId));
    return events.filter((event) => !historyEventIds.has(event.id));
}
