import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileUser } from "./useProfile";
import { API_URL } from "../config";

type UpdateProfileInput = Partial<
    Pick<ProfileUser, "username" | "email" | "phoneNumber" | "bio" | "car">
>;

async function updateProfile(data: UpdateProfileInput): Promise<ProfileUser> {
    const res = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to update profile");
    }

    const result = await res.json();
    return result.user as ProfileUser;
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["profile"], updatedUser);
        },
    });
}
