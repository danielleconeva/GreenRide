import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
    id: string;
    email: string;
    username: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};


export const register = createAsyncThunk<
    User,
    { email: string; password: string; username: string },
    { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return rejectWithValue(errorData.error || "Registration failed");
        }

        return (await res.json()) as User;
    } catch {
        return rejectWithValue("Network error");
    }
});


export const login = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return rejectWithValue(errorData.error || "Login failed");
        }

        return (await res.json()) as User;
    } catch {
        return rejectWithValue("Network error");
    }
});

export const checkAuth = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch("http://localhost:3000/api/users/profile", {
            credentials: "include",
        });

        if (!res.ok) {
            return rejectWithValue("Not authenticated");
        }

        return (await res.json()) as User;
    } catch {
        return rejectWithValue("Network error");
    }
});

export const logout = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) {
            return rejectWithValue("Logout failed");
        }

        return;
    } catch {
        return rejectWithValue("Network error");
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            })

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })

            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.user = null;
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload || "Logout failed";
            });
    },
});


export default authSlice.reducer;
