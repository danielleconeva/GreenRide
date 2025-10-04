import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Notification = {
    type: "error" | "success";
    message: string;
}

type NotificationsState = {
    current?: Notification;
}

const initialState: NotificationsState = { current: undefined };

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<Notification>) => {
            state.current = action.payload;
        },
        clearNotification: (state) => {
            state.current = undefined;
        }
    }
})

export default notificationsSlice.reducer;
export const { showNotification, clearNotification } = notificationsSlice.actions;