import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { logout } from "../store/authSlice";

export default function LogoutButton() {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <>
            <button onClick={() => dispatch(logout())}>Log Out</button>
        </>
    );
}
