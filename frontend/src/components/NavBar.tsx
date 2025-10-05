import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import LogoutButton from "./LogoutButton";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";

const NavElement = styled.nav`
    font-family: ${theme.fonts.body};
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: end;
    padding: 2rem 3rem;
    background-color: white;

    @media (max-width: 900px) {
        padding: 1.5rem 1.5rem;
        justify-content: space-between;
        align-items: center;
    }

    @media (min-width: 1600px) {
        padding: 2.5rem 4rem;
    }

    @media (min-width: 1920px) {
        padding: 3rem 5rem;
    }
`;

const MenuWrapper = styled.ul<{ $isOpen?: boolean }>`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
    align-items: center;

    @media (max-width: 900px) {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 320px;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 6rem 2.5rem 2rem;
        box-shadow: -4px 0 24px rgba(0, 0, 0, 0.08);
        gap: 0.5rem;
        align-items: flex-start;
        transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
        opacity: ${(props) => (props.$isOpen ? "1" : "0")};
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        border-left: 1px solid rgba(229, 231, 235, 0.3);
    }

    @media (min-width: 1600px) {
        gap: 2.5rem;
    }

    @media (min-width: 1920px) {
        gap: 3rem;
    }
`;

const MenuItem = styled.li`
    text-decoration: none;

    a {
        text-decoration: none;
        color: #374151;
        font-weight: 500;
        padding-bottom: 0.25rem;
        border-bottom: 2px solid transparent;
        transition: all 0.2s ease;

        &:hover {
            color: #14b8a6;
        }

        &.active {
            border-bottom-color: #3a414b;
        }
    }

    @media (max-width: 900px) {
        width: 100%;

        a {
            display: block;
            padding: 0.75rem 0;
            font-size: 1.1rem;
        }
    }

    @media (min-width: 1600px) {
        a {
            font-size: 1.05rem;
        }
    }

    @media (min-width: 1920px) {
        a {
            font-size: 1.1rem;
        }
    }
`;

const UserBadge = styled(NavLink)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #374151;
    transition: all 0.2s ease;
    padding: 0.1rem;
    text-decoration: none;
    flex-shrink: 0;
    border-bottom: 0 !important;

    &:hover {
        background: #f3f4f8;
        color: #14b8a6;
        border-color: #cfd2d7;
        box-shadow: inset 0 -1px 0 #cfd2d7;
    }

    &.active {
        background: #edeeef;
        color: #14b8a6;
        border-bottom: none !important;
    }

    &:focus-visible {
        outline: 2px solid #14b8a6;
        outline-offset: 2px;
    }

    @media (max-width: 900px) {
        display: inline-flex !important;
        padding: 0.1rem !important;
    }

    @media (min-width: 1600px) {
        width: 42px;
        height: 40px;
    }

    @media (min-width: 1920px) {
        width: 44px;
        height: 42px;
    }
`;

const MenuToggle = styled.button`
    display: none;
    background: none;
    border: none;
    color: #374151;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;

    &:hover {
        color: #14b8a6;
    }

    @media (max-width: 900px) {
        display: block;
    }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
    display: none;

    @media (max-width: 900px) {
        display: ${(props) => (props.$isOpen ? "block" : "none")};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
`;

const CloseButton = styled.button`
    display: none;

    @media (max-width: 900px) {
        display: block;
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: none;
        border: none;
        color: #374151;
        cursor: pointer;
        padding: 0.5rem;

        &:hover {
            color: #14b8a6;
        }
    }
`;

export default function NavBar() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <NavElement>
                <MenuToggle onClick={toggleMenu} aria-label="Toggle menu">
                    <Menu size={24} />
                </MenuToggle>

                <MenuWrapper $isOpen={isMenuOpen}>
                    <CloseButton onClick={closeMenu} aria-label="Close menu">
                        <X size={24} />
                    </CloseButton>

                    <MenuItem>
                        <NavLink to="/" end onClick={closeMenu}>
                            Home
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/search" onClick={closeMenu}>
                            Find a Ride
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/publish" onClick={closeMenu}>
                            Publish a Ride
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/eco-impact" onClick={closeMenu}>
                            Eco Impact
                        </NavLink>
                    </MenuItem>
                    {user ? (
                        <>
                            <MenuItem>
                                <UserBadge to="/profile" onClick={closeMenu}>
                                    <User size={20} />
                                </UserBadge>
                            </MenuItem>
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <MenuItem>
                                <NavLink to="/login" onClick={closeMenu}>
                                    Log In
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <NavLink to="/register" onClick={closeMenu}>
                                    Sign Up
                                </NavLink>
                            </MenuItem>
                        </>
                    )}
                </MenuWrapper>
            </NavElement>

            <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
        </>
    );
}
