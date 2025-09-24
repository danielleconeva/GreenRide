import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";

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
            border-bottom-color: #374151;
        }
    }
`;

export default function NavBar() {
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
                    <NavLink to="/login">Log In</NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/register">Sign Up</NavLink>
                </MenuItem>
            </MenuWrapper>
        </NavElement>
    );
}
