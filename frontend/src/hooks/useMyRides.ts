import { useQuery } from "@tanstack/react-query";
import type { Ride } from "../types/ride";
import { API_URL } from "../config";

async function fetchMyRides(): Promise<Ride[]> {
    const res = await fetch(`${API_URL}/rides/my`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch my rides");
    return res.json();
}

export function useMyRides() {
    return useQuery<Ride[]>({
        queryKey: ["rides", "my"],
        queryFn: fetchMyRides,
    });
}
