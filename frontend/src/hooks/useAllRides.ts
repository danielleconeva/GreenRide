import { useQuery } from "@tanstack/react-query";
import type { Ride } from "../types/ride";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function fetchAllRides(): Promise<Ride[]> {
    const res = await fetch(`${API_BASE}/api/rides`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch all rides");
    return res.json();
}

export function useAllRides() {
    return useQuery<Ride[]>({
        queryKey: ["rides", "all"],
        queryFn: fetchAllRides,
    });
}
