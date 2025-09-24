import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.tsx";
import styled from "styled-components";

const FooterElement = styled.footer`
    font-family: ${({ theme }) => theme.fonts.body};
    text-align: center;
    padding: 1.6rem;
    font-size: 0.9rem;
    color: #393737;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

function RootLayout() {
    return (
        <div>
            <header>
                <NavBar />
            </header>

            <main>
                <Outlet />
            </main>

            <FooterElement>
                Making transportation sustainable, one ride at a time. © 2025
                GreenRide. All rights reserved.
            </FooterElement>
        </div>
    );
}

export default RootLayout;
