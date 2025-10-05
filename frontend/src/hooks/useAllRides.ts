import { useQuery } from "@tanstack/react-query";
import type { Ride } from "../types/ride";
import { API_URL } from "../config";

async function fetchAllRides(): Promise<Ride[]> {
    const res = await fetch(`${API_URL}/rides`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch all rides");
    return res.json();
}

export function useAllRides() {
    return useQuery<Ride[]>({
        queryKey: ["rides", "all"],
        queryFn: fetchAllRides,
    });
}
