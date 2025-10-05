import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Ride } from "../types/ride";
import { API_URL } from "../config";

async function getRideById(rideId: string): Promise<Ride> {
    const res = await fetch(`${API_URL}/rides/${rideId}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch ride");
    return res.json();
}

async function deleteRide(rideId: string) {
    const res = await fetch(`${API_URL}/rides/${rideId}`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete ride");
    return res.json();
}

async function updateRide(rideId: string, data: Partial<Ride>): Promise<Ride> {
    const res = await fetch(`${API_URL}/rides/${rideId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update ride");
    return res.json();
}

export default function useRide(rideId?: string) {
    const queryClient = useQueryClient();

    const rideQuery = useQuery<Ride>({
        queryKey: ["ride", rideId],
        enabled: !!rideId,
        queryFn: () => getRideById(rideId as string),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteRide(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myRides"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: (vars: { id: string; data: Partial<Ride> }) =>
            updateRide(vars.id, vars.data),
        onSuccess: (updatedRide) => {
            queryClient.setQueryData(["ride", updatedRide._id], updatedRide);
            queryClient.invalidateQueries({ queryKey: ["myRides"] });
        },
    });

    return {
        ...rideQuery,
        deleteRide: deleteMutation.mutate,
        deleteStatus: deleteMutation.status,
        updateRide: updateMutation.mutate,
        updateStatus: updateMutation.status,
    };
}
