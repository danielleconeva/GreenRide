export interface Ride {
    _id: string;
    from: string;
    to: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    durationMin: number;
    pricePerSeat: number;
    seatsAvailable: number;
    amenities: {
        airConditioning: boolean;
        music: boolean;
        smokingAllowed: boolean;
        petsAllowed: boolean;
    };
    ecoImpact: {
        co2SavedKg: number;
    };
    driver: {
        _id: string;
        username: string;
        rating?: number;
    };
    passengers: Array<{ _id: string; username: string }>;
    createdAt: string;
    updatedAt: string;
}

export interface RideSearchParams {
    from: string;
    to: string;
    date: string;
    passengers: string;
}

export interface NewRide {
    from: string;
    to: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    durationMin: number;
    pricePerSeat: number;
    seatsAvailable: number;

    amenities: {
        airConditioning: boolean;
        music: boolean;
        smokingAllowed: boolean;
        petsAllowed: boolean;
    };
}
