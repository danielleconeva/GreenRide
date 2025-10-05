import { useQuery } from "@tanstack/react-query";
import type { Ride, RideSearchParams } from "../types/ride";
import { API_URL } from "../config";

async function fetchRides(params: RideSearchParams): Promise<Ride[]> {
    const search = new URLSearchParams({
        from: params.from,
        to: params.to,
        date: params.date,
        passengers: String(params.passengers),
    }).toString();

    const res = await fetch(`${API_URL}/rides?${search}`);
    if (!res.ok) throw new Error("Failed to fetch rides");
    return res.json();
}

export default function useRides(params: RideSearchParams) {
    return useQuery<Ride[]>({
        queryKey: ["rides", params],
        queryFn: () => fetchRides(params),
        enabled: Boolean(params.from && params.to && params.date),
    });
}
