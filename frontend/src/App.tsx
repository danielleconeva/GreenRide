import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";
import "./styles/App.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store.ts";
import { checkAuth } from "./store/authSlice.ts";
import { useEffect } from "react";
import Notification from "./components/Notification.tsx";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <>
            <RouterProvider router={router} />
            <Notification />
        </>
    );
}
