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
    min-height: 100vh;
    width: 100%;
    padding: 2rem;

    opacity: 0;
    animation: ${fadeUp} 0.8s ease forwards;
`;

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    opacity: 0;
    animation: ${fadeInScale} 0.8s ease forwards;
    animation-delay: 0.3s;

    transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

const IntroText = styled.div`
    flex: 1;
    text-align: center;
    padding-bottom: 3.5rem;

    h1 {
        margin-bottom: 1.3rem;
        color: ${({ theme }) => theme.colors.foreground};
        font-size: 2.4rem;

        opacity: 0;
        animation: ${fadeUp} 0.8s ease forwards;
        animation-delay: 0.1s;
    }

    p {
        margin: 0;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.mutedForeground || "#555"};
        max-width: 700px;

        opacity: 0;
        animation: ${fadeUp} 0.8s ease forwards;
        animation-delay: 0.2s;
    }
`;

const BadgeWrapper = styled.div`
    opacity: 0;
    animation: ${fadeInScale} 0.8s ease forwards;
    animation-delay: 0.5s;

    transition: transform 0.3s ease, box-shadow 0.3s ease;
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
