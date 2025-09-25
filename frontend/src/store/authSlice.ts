import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User { id: string; email: string; username: string; }
interface AuthState { user: User | null; loading: boolean; error: string | null; }

const initialState: AuthState = { user: null, loading: false, error: null };

/* 1) REGISTER — send "confirm-password" and return data.user */
export const register = createAsyncThunk<
    User,
    { email: string; password: string; confirmPassword: string; username: string },
    { rejectValue: string }
>("auth/register", async (u, { rejectWithValue }) => {
    try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                username: u.username,
                email: u.email,
                password: u.password,
                ["confirm-password"]: u.confirmPassword, // IMPORTANT
            }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return rejectWithValue(data?.error || data?.message || "Registration failed");
        return data.user as User; // <-- only the user object
    } catch {
        return rejectWithValue("Network error");
    }
});

/* 2) LOGIN — return data.user */
export const login = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string }
>("auth/login", async (cred, { rejectWithValue }) => {
    try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(cred),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return rejectWithValue(data?.error || data?.message || "Login failed");
        return data.user as User;
    } catch {
        return rejectWithValue("Network error");
    }
});

/* 3) CHECK (hydrate) — call on app load; your API: /api/users/profile */
export const checkAuth = createAsyncThunk<
    User | null,
    void,
    { rejectValue: string }
>("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch("http://localhost:3000/api/users/profile", {
            credentials: "include",
        });
        if (!res.ok) return rejectWithValue("Not authenticated");
        const data = await res.json();
        const raw = data.user ?? data ?? null;
        if (!raw) return null;
        return {
            id: raw.id ?? raw._id ?? "",
            email: raw.email,
            username: raw.username,
        } as User;
    } catch {
        return rejectWithValue("Network error");
    }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) return rejectWithValue("Logout failed");
        } catch {
            return rejectWithValue("Network error");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(register.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(register.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
            .addCase(register.rejected, (s, a) => { s.loading = false; s.error = a.payload || "Registration failed"; })

            .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(login.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
            .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload || "Login failed"; })

            .addCase(checkAuth.fulfilled, (s, a) => { s.user = a.payload; })
            .addCase(checkAuth.rejected, (s) => { s.user = null; })

            .addCase(logout.fulfilled, (s) => { s.user = null; s.loading = false; s.error = null; })
            .addCase(logout.rejected, (s, a) => { s.error = a.payload || "Logout failed"; });
    },
});

export default authSlice.reducer;
