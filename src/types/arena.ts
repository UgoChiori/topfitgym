export type SportType = "Padel" | "Squash" | "Table Tennis";

export interface ArenaBooking {
    memberId: string;
    memberName: string;
    resourceId: string;
    sport: SportType;
    date: string; // ISO format date string
    timeSlot: string;
    status: 'confirmed' | 'cancelled';
    startTime: string; // ISO format date-time string
    endTime: string; // ISO format date-time string
}