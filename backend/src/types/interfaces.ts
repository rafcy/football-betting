export interface Event {
    id: number;
    homeTeam: string;
    awayTeam: string;
    odds: {
        HOME: number;
        DRAW: number;
        AWAY: number;
    };
}

export const VALID_OUTCOMES = ['HOME', 'DRAW', 'AWAY'] as const;
export type SelectedOutcome = typeof VALID_OUTCOMES[number];

export interface Selection {
    eventId: number;
    selectedOutcome: 'HOME' | 'DRAW' | 'AWAY';
    eventDetails: Event;
}
