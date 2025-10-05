import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Ride, NewRide } from "../types/ride";
import { API_URL } from "../config";

async function postRide(payload: NewRide): Promise<Ride> {
    const res = await fetch(`${API_URL}/rides`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Failed to create ride");
    }
    const { ride } = await res.json();
    return ride as Ride;
}

export default function useCreateRide() {
    const queryClient = useQueryClient();

    return useMutation<Ride, Error, NewRide>({
        mutationFn: postRide,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rides"] }),
    });
}
