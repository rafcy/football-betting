export interface Event {
    id: number;
    homeTeam: string;
    awayTeam: string;
    odds: Odds;
}

export interface Odds {
    HOME: number;
    DRAW: number;
    AWAY: number;
}

export interface HistoryEvent {
    eventId: number;
    selectedOutcome: string;
    eventDetails: Event;
}
