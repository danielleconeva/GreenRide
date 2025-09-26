import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import LogoutButton from "./LogoutButton";
import { User } from "lucide-react";

const NavElement = styled.nav`
    font-family: ${theme.fonts.body};
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: end;
    padding: 2rem 3rem;
    background-color: white;
`;

const MenuWrapper = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
    align-items: center;
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
`;

const UserBadge = styled(NavLink)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 36px;
    border-radius: 50%;

    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #374151;
    transition: all 0.2s ease;

    padding: 0.1rem;
    border-bottom: 0 !important;
    text-decoration: none;

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
`;

export default function NavBar() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <NavElement>
            <MenuWrapper>
                <MenuItem>
                    <NavLink to="/" end>
                        Home
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/search">Find a Ride</NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/publish">Publish a Ride</NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/eco-impact">Eco Impact</NavLink>
                </MenuItem>
                {user ? (
                    <>
                        <MenuItem>
                            <UserBadge to="/profile">
                                <User size={20} />
                            </UserBadge>
                        </MenuItem>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <MenuItem>
                            <NavLink to="/login">Log In</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="/register">Sign Up</NavLink>
                        </MenuItem>
                    </>
                )}
            </MenuWrapper>
        </NavElement>
    );
}
