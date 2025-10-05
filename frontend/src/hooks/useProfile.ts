import { useQuery } from "@tanstack/react-query";

export type ProfileUser = {
    _id: string;
    id?: string;
    username: string;
    email: string;
    phoneNumber?: string;
    bio?: string;
    role: "passenger" | "driver";
    rating?: number;
    ecoStats?: {
        totalRides: number;
        co2SavedKg: number;
        moneySaved: number;
    };
    car?: {
        make?: string;
        model?: string;
        year?: string;
        color?: string;
        licensePlate?: string;
    };
    tripsCompleted?: number;
    achievements?: string[];
    createdAt?: string;
    updatedAt?: string;
};


async function fetchProfile(): Promise<ProfileUser> {
    const res = await fetch(`http://localhost:3000/api/users/profile/full`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    const data = await res.json();
    return data.user as ProfileUser;
}


export function useProfile() {
    return useQuery<ProfileUser>({
        queryKey: ["profile"],
        queryFn: fetchProfile,
        staleTime: 60_000,
    });
}
