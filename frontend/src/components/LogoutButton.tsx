// LogoutButton.tsx
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LogoutBtn = styled.button`
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;

    text-decoration: none;
    color: #374151;
    font-weight: 500;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;

    &:hover {
        color: #14b8a6;
    }

    &:focus-visible {
        outline: 2px solid #14b8a6;
        outline-offset: 2px;
    }
`;

export default function LogoutButton() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <LogoutBtn type="button" onClick={handleLogout}>
            Log Out
        </LogoutBtn>
    );
}
