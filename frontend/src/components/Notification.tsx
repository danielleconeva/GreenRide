import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { type AppDispatch, type RootState } from "../store/store";
import { useEffect, useState } from "react";
import { clearNotification } from "../store/notificationsSlice";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
`;

const Popup = styled.div<{ $type: "success" | "error"; $closing: boolean }>`
    position: fixed;
    top: 6rem;
    right: 1.5rem;
    background: #fff;
    color: ${({ theme, $type }) =>
        $type === "success" ? theme.colors.primary : "#d36969"};
    border: 0.5px solid
        ${({ theme, $type }) =>
            $type === "success" ? theme.colors.primary : "#d36969"};
    padding: 1.5rem 1.75rem;
    border-radius: 12px;
    font-weight: 500;
    font-size: 1rem;
    font-family: ${({ theme }) => theme.fonts.body};
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    z-index: 9999;
    animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.3s ease
        forwards;
    cursor: pointer;

    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
`;

export default function Notification() {
    const notification = useSelector(
        (state: RootState) => state.notifications.current
    );
    const dispatch = useDispatch<AppDispatch>();

    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (!notification) return;

        setClosing(false);

        const timer = setTimeout(() => {
            setClosing(true);
            setTimeout(() => dispatch(clearNotification()), 300);
        }, 2500);

        return () => clearTimeout(timer);
    }, [notification, dispatch]);

    if (!notification) return null;

    return (
        <Popup
            $type={notification.type}
            $closing={closing}
            onClick={() => dispatch(clearNotification())}
        >
            {notification.message}
        </Popup>
    );
}
