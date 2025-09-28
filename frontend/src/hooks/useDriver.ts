import { useQuery } from "@tanstack/react-query";
import type { DriverPublic } from "../types/driver";

async function fetchDriverPublic(id: string): Promise<DriverPublic> {
    const res = await fetch(`/api/users/${id}/public`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch driver");
    const data = await res.json();
    return (data?.user ?? data) as DriverPublic;
}

export default function useDriver(driverId?: string) {
    return useQuery<DriverPublic>({
        queryKey: ["driverPublic", driverId],
        queryFn: () => fetchDriverPublic(driverId as string),
        enabled: Boolean(driverId),
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        retry: 1,
    });
}
