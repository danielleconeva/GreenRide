import styled from "styled-components";
import { theme } from "../styles/theme.ts";
import NavBar from "../components/NavBar.tsx";

const Wrapper = styled.div`
    min-height: 100vh;
    background-color: ${theme.colors.muted};
`;

export default function HomePage() {
    return (
        <Wrapper>
            <NavBar />
        </Wrapper>
    );
}
