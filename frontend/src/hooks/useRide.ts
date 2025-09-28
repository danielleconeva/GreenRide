import { useQuery } from "@tanstack/react-query";
import type { Ride } from "../types/ride";

async function getRideById(rideId: string): Promise<Ride> {
    const res = await fetch(`http://localhost:3000/api/rides/${rideId}`);
    if (!res.ok) throw new Error("Failed to fetch ride");
    return res.json();
}

export default function useRide(rideId?: string) {
    return useQuery<Ride>({
        queryKey: ["ride", rideId],
        enabled: !!rideId,
        queryFn: () => getRideById(rideId as string),
    });
}
