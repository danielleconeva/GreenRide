import { useQuery } from "@tanstack/react-query";

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
    const res = await fetch("http://localhost:3000/api/users/profile/eco", {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch eco stats");
    return res.json();
}

export function useEcoStats() {
    return useQuery<EcoResponse>({
        queryKey: ["ecoStats"],
        queryFn: fetchEcoStats,
        staleTime: 1000 * 60 * 2,
    });
}
