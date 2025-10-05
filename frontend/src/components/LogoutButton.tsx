import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const LogoutBtn = styled.button`
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    color: #374151;
    font-weight: 500;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;

    &:hover {
        color: #14b8a6;
    }
`;

export default function LogoutButton() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <LogoutBtn type="button" onClick={() => setShowModal(true)}>
                Log Out
            </LogoutBtn>

            {showModal && (
                <ConfirmModal
                    title="Log Out?"
                    message="Are you sure you want to log out of your account?"
                    confirmLabel="Log Out"
                    cancelLabel="Cancel"
                    onConfirm={handleLogout}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    );
}
