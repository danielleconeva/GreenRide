import { useQuery } from "@tanstack/react-query";
import type { Ride } from "../types/ride";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function fetchMyRides(): Promise<Ride[]> {
    const res = await fetch(`${API_BASE}/api/rides/my`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch my rides");
    return res.json();
}

export function useMyRides() {
    return useQuery<Ride[]>({
        queryKey: ["rides", "my"],
        queryFn: fetchMyRides,
    });
}
