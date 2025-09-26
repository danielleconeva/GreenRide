import { useQuery } from "@tanstack/react-query";
import type { Ride, RideSearchParams } from "../types/ride";


async function fetchRides(params: RideSearchParams): Promise<Ride[]> {
    const search = new URLSearchParams({
        from: params.from,
        to: params.to,
        date: params.date,
        passengers: params.passengers
    }).toString();

    const res = await fetch(`http://localhost:3000/api/rides?${search}`);
    if (!res.ok) {
        throw new Error('Failed to fetch rides');
    }
    return res.json();
}

export default function useRides(params: RideSearchParams) {
    return useQuery<Ride[]>({
        queryKey: ["rides", params],
        queryFn: () => fetchRides(params),
        enabled: Boolean(params.from && params.to && params.date)
    })

}