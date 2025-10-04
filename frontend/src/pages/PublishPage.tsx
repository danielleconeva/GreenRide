import styled, { keyframes } from "styled-components";
import PublishForm from "../components/PublishForm";
import useCreateRide from "../hooks/useCreateRide";
import type { NewRide } from "../types/ride";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import PublishFallback from "../components/PublishFallback";

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

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    opacity: 0;
    animation: ${fadeInScale} 0.8s ease forwards;
    animation-delay: 0.3s;

    transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

export default function PublishPage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const { mutate, isPending, isSuccess, error, data } = useCreateRide();

    if (!user) {
        return <PublishFallback />;
    }
    function handleSubmit(values: NewRide) {
        mutate(values, {
            onSuccess: () => {
                navigate("/");
            },
        });
    }

    return (
        <MainWrapper>
            <IntroText>
                <h1>Publish a Ride</h1>
                <p>
                    Share your journey with fellow travelers. Reduce costs, help
                    the environment and make new connections along the way.
                </p>
            </IntroText>

            <FormWrapper>
                <PublishForm
                    onSubmit={handleSubmit}
                    submitting={isPending}
                    serverError={error?.message}
                    createdRide={isSuccess ? data : null}
                />
            </FormWrapper>
        </MainWrapper>
    );
}
