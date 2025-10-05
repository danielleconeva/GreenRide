import { useIsFetching } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../store/store";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 9998;
`;

const Spinner = styled.div`
    width: 48px;
    height: 48px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 640px) {
        width: 36px;
        height: 36px;
        border-width: 3px;
    }

    @media (min-width: 1600px) {
        width: 56px;
        height: 56px;
        border-width: 5px;
    }
`;

export default function GlobalLoader() {
    const isFetching = useIsFetching({ type: "active" });
    const authLoading = useSelector((s: RootState) => s.auth.loading);

    const isLoading = isFetching > 0 || authLoading;
    if (!isLoading) return null;
    return (
        <Overlay>
            <Spinner />
        </Overlay>
    );
}
