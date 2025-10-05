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
    font-family: ${({ theme }) => theme.fonts.body};
    transition: all 0.3s ease;

    @media (max-width: 900px) {
        padding: 1.5rem;
    }

    @media (max-width: 640px) {
        padding: 1rem;
    }

    @media (min-width: 1600px) {
        padding: 3rem 2.5rem;
    }

    @media (min-width: 1920px) {
        padding: 4rem 3rem;
    }
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${theme.colors.primary};

    @media (max-width: 640px) {
        font-size: 2rem;
    }

    @media (min-width: 1600px) {
        font-size: 3rem;
        margin-bottom: 1.5rem;
    }

    @media (min-width: 1920px) {
        font-size: 3.4rem;
    }
`;

const Message = styled.p`
    font-size: 1.125rem;
    margin-bottom: 2rem;
    color: #555;
    max-width: 700px;
    line-height: 1.6;

    @media (max-width: 640px) {
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }

    @media (min-width: 1600px) {
        font-size: 1.25rem;
        max-width: 850px;
    }

    @media (min-width: 1920px) {
        font-size: 1.35rem;
        max-width: 950px;
    }
`;

const ErrorBox = styled.pre`
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid ${theme.colors.mutedForeground};
    border-radius: 1rem;
    padding: 1.25rem 1.5rem;
    max-width: 600px;
    overflow-x: auto;
    font-size: 0.9rem;
    color: ${theme.colors.foreground};
    text-align: left;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    margin-bottom: 2rem;

    @media (max-width: 640px) {
        max-width: 90%;
        font-size: 0.8rem;
        padding: 1rem;
    }

    @media (min-width: 1600px) {
        font-size: 1rem;
        padding: 1.5rem 2rem;
        max-width: 700px;
    }

    @media (min-width: 1920px) {
        font-size: 1.05rem;
        padding: 2rem 2.5rem;
        max-width: 850px;
    }
`;

const BackButton = styled(Link)`
    display: inline-block;
    margin-top: 1rem;
    padding: 0.9rem 1.8rem;
    background: ${theme.colors.primary};
    color: ${theme.colors.primaryForeground};
    border: none;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
        background: ${theme.colors.primaryDark};
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 640px) {
        padding: 0.8rem 1.5rem;
        font-size: 0.95rem;
    }

    @media (min-width: 1600px) {
        padding: 1rem 2.2rem;
        font-size: 1.1rem;
    }

    @media (min-width: 1920px) {
        padding: 1.2rem 2.5rem;
        font-size: 1.2rem;
        border-radius: 1rem;
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

            <BackButton to="/">Back to Home</BackButton>
        </Wrapper>
    );
}
