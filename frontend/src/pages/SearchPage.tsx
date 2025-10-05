import SearchForm from "../components/SearchForm";
import styled, { keyframes } from "styled-components";
import EcoSearchBadge from "../components/EcoSearchBadge";

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeInScale = keyframes`
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const MainWrapper = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 2rem;
    opacity: 0;
    animation: ${fadeUp} 0.8s ease forwards;

    @media (max-width: 640px) {
        padding: 1.5rem 1rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    @media (max-width: 900px) {
        padding: 1.75rem 1.25rem;
    }

    @media (min-width: 1600px) {
        padding: 3rem;
        min-height: calc(100vh - 120px);
    }

    @media (min-width: 1920px) {
        padding: 4rem;
        min-height: calc(100vh - 140px);
    }
`;

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    opacity: 0;
    animation: ${fadeInScale} 0.8s ease forwards;
    animation-delay: 0.3s;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    max-width: 900px;

    @media (max-width: 640px) {
        max-width: 100%;
        padding: 0 0.25rem;
        margin-top: 1.5rem;
    }

    @media (max-width: 900px) {
        max-width: 100%;
        padding: 0 0.5rem;
    }

    @media (min-width: 1600px) {
        max-width: 1000px;
    }

    @media (min-width: 1920px) {
        max-width: 1100px;
    }
`;

const IntroText = styled.div`
    text-align: center;
    padding-bottom: 2rem;

    h1 {
        margin-bottom: 1.3rem;
        color: ${({ theme }) => theme.colors.foreground};
        font-size: 2.4rem;
        opacity: 0;
        animation: ${fadeUp} 0.8s ease forwards;
        animation-delay: 0.1s;
    }

    p {
        margin: 0 auto;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.mutedForeground || "#555"};
        max-width: 700px;
        opacity: 0;
        animation: ${fadeUp} 0.8s ease forwards;
        animation-delay: 0.2s;
        line-height: 1.6;
    }

    @media (max-width: 640px) {
        padding-bottom: 1.25rem;

        h1 {
            font-size: 1.75rem;
            margin-bottom: 1rem;
        }

        p {
            font-size: 0.95rem;
            max-width: 100%;
            padding: 0 0.5rem;
        }
    }

    @media (max-width: 900px) {
        padding-bottom: 1.5rem;

        h1 {
            font-size: 2rem;
        }

        p {
            font-size: 1.05rem;
            max-width: 90%;
        }
    }

    @media (min-width: 1600px) {
        padding-bottom: 2.5rem;

        h1 {
            font-size: 2.8rem;
            margin-bottom: 1.5rem;
        }

        p {
            font-size: 1.3rem;
            max-width: 800px;
        }
    }

    @media (min-width: 1920px) {
        padding-bottom: 3rem;

        h1 {
            font-size: 3.2rem;
            margin-bottom: 1.75rem;
        }

        p {
            font-size: 1.4rem;
            max-width: 900px;
        }
    }
`;

const BadgeWrapper = styled.div`
    opacity: 0;
    animation: ${fadeInScale} 0.8s ease forwards;
    animation-delay: 0.5s;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    @media (max-width: 640px) {
        margin-top: 1rem;
        padding: 0 0.5rem;
    }

    @media (max-width: 900px) {
        margin-top: 1.5rem;
    }

    @media (min-width: 1600px) {
        margin-top: 2.5rem;
    }

    @media (min-width: 1920px) {
        margin-top: 3rem;
    }
`;

export default function SearchPage() {
    return (
        <MainWrapper>
            <IntroText>
                <h1>Search Available Rides</h1>
                <p>
                    Find the perfect ride that matches your journey. Share
                    costs, reduce emissions and connect with fellow travelers.
                </p>
            </IntroText>
            <FormWrapper>
                <SearchForm />
            </FormWrapper>
            <BadgeWrapper>
                <EcoSearchBadge />
            </BadgeWrapper>
        </MainWrapper>
    );
}
