
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
    _id: string;
    ride:
    | string
    | {
        _id: string;
        from: string;
        to: string;
        departureDate: string;
        departureTime: string;
        arrivalTime: string;
        durationMin: number;
        pricePerSeat: number;
        driver: { _id: string; username: string; rating?: number };
    };
    passenger: string | { _id: string; username: string; email?: string };
    seatsBooked: number;
    noteToDriver?: string;
    status: BookingStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBookingInput {
    rideId: string;
    seatsBooked: number;
    noteToDriver?: string;
}

export interface CreateBookingResponse {
    message: string;
    booking: Booking;
}
