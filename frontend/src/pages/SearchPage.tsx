import SearchForm from "../components/SearchForm";
import styled from "styled-components";
import EcoSearchBadge from "../components/EcoSearchBadge";

const MainWrapper = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const FormWrapper = styled.div``;
const IntroText = styled.div`
    flex: 1;
    text-align: center;
    padding-bottom: 3.5rem;

    h1 {
        margin-bottom: 1.3rem;
        color: #292727;
        font-size: 2.4rem;
        color: ${({ theme }) => theme.colors.foreground};
    }

    p {
        margin: 0;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.mutedForeground || "#555"};
        max-width: 700px;
    }
`;

export default function SearchPage() {
    return (
        <>
            <MainWrapper>
                <IntroText>
                    <h1>Search Available Rides</h1>
                    <p>
                        Find the perfect ride that matches your journey. Share
                        costs, reduce emissions and connect with fellow
                        travelers.
                    </p>
                </IntroText>
                <FormWrapper>
                    <SearchForm />
                </FormWrapper>
                <EcoSearchBadge />
            </MainWrapper>
        </>
    );
}
