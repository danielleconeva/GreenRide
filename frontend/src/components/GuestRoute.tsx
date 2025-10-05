import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { ReactNode } from "react";

export default function GuestRoute({ children }: { children: ReactNode }) {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
