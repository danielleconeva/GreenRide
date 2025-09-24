import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    background: ${theme.colors.muted};
    color: ${theme.colors.foreground};
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        sans-serif;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${theme.colors.primary};
`;

const Message = styled.p`
    font-size: 1.125rem;
    margin-bottom: 2rem;
`;

const ErrorBox = styled.pre`
    background: ${theme.colors.card};
    border: 1px solid ${theme.colors.mutedForeground};
    border-radius: 0.75rem;
    padding: 1rem;
    max-width: 600px;
    overflow-x: auto;
    font-size: 0.875rem;
    color: ${theme.colors.foreground};
    text-align: left;
`;

const BackButton = styled.button`
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background: ${theme.colors.primary};
    color: ${theme.colors.primaryForeground};
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: ${theme.colors.primaryDark};
    }
`;

export default function ErrorPage() {
    const error = useRouteError() as Error;

    return (
        <Wrapper>
            <Title>Something went wrong</Title>
            <Message>
                An unexpected error occurred while loading this page.
            </Message>

            {error?.message && <ErrorBox>{error.message}</ErrorBox>}

            <BackButton as={Link} to="/">
                Back to Home
            </BackButton>
        </Wrapper>
    );
}
