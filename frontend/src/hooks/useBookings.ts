import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Booking } from "../types/booking";
import { API_URL } from "../config";

async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) {
        let msg = "Request failed.";
        try {
            const data = await res.json();
            if (data?.error || data?.message) msg = data.error || data.message;
        } catch {

        }
        throw new Error(msg);
    }
    return res.json();
}

export function useMyBookings() {
    return useQuery<Booking[], Error>({
        queryKey: ["bookings", "my"],
        queryFn: () => fetchJSON<Booking[]>(`${API_URL}/bookings/my`),
        placeholderData: keepPreviousData,
    });
}

export function useRideBookings(rideId?: string) {
    return useQuery<Booking[], Error>({
        queryKey: ["bookings", "ride", rideId],
        queryFn: () => fetchJSON<Booking[]>(`${API_URL}/bookings/ride/${rideId}`),
        enabled: !!rideId,
        placeholderData: keepPreviousData,
    });
}
