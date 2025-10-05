import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateBookingInput, CreateBookingResponse } from "../types/booking";
import { API_URL } from "../config";

async function postBooking(payload: CreateBookingInput): Promise<CreateBookingResponse> {
    const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        let msg = "Failed to confirm booking.";
        try {
            const data = await res.json();
            if (data?.error || data?.message) msg = data.error || data.message;
        } catch { }
        throw new Error(msg);
    }
    return res.json();
}

export default function useCreateBooking() {
    const qc = useQueryClient();

    const mutation = useMutation<CreateBookingResponse, Error, CreateBookingInput>({
        mutationFn: postBooking,
        onSuccess: (_data, vars) => {
            qc.invalidateQueries({ queryKey: ["ride", vars.rideId] });
            qc.invalidateQueries({ queryKey: ["bookings", "my"] });
        },
    });

    return {
        createBooking: mutation.mutateAsync,
        isCreating: mutation.isPending,
        error: mutation.error,
        data: mutation.data,
        reset: mutation.reset,
    };
}
