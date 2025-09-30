export interface DriverPublic {
    id: string;
    username: string;
    rating?: number;
    phoneNumber?: string;
    tripsCompleted?: number;
    car?: { make?: string; model?: string; year?: number; licensePlate?: string | null } | null;
    ecoStats?: { totalRides: number; co2SavedKg: number; moneySaved: number };
    createdAt?: string;
}
