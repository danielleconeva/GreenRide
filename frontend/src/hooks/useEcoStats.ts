import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../config";

export type Achievement = {
    name: string;
    description: string;
    unlocked: boolean;
    unlockedAt: string | null;
    progress: number;
    current: number;
    target: number;
};

export type EcoStats = {
    totalRides: number;
    co2SavedKg: number;
    moneySaved: number;
};

export type EcoResponse = {
    ecoStats: EcoStats;
    achievements: Achievement[];
};

async function fetchEcoStats(): Promise<EcoResponse> {
    const res = await fetch(`${API_URL}/users/profile/eco`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch eco stats");
    return res.json();
}

export function useEcoStats(enabled: boolean = true) {
    return useQuery<EcoResponse>({
        queryKey: ["ecoStats"],
        queryFn: fetchEcoStats,
        staleTime: 1000 * 60 * 2,
        enabled,
    });
}
