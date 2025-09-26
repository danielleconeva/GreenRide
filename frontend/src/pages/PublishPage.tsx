import styled from "styled-components";
import PublishForm from "../components/PublishForm";

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
`;

const IntroText = styled.div`
    flex: 1;
    text-align: center;
    padding-bottom: 2.5rem;

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
export default function PublishPage() {
    return (
        <>
            <MainWrapper>
                <IntroText>
                    <h1>Publish a Ride</h1>
                    <p>
                        Share your journey with fellow travelers. Reduce costs,
                        help the environment and make new connections along the
                        way.
                    </p>
                </IntroText>
                <PublishForm></PublishForm>
            </MainWrapper>
        </>
    );
}
