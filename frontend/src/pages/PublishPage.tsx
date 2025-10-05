import styled, { keyframes } from "styled-components";
import PublishForm from "../components/PublishForm";
import useCreateRide from "../hooks/useCreateRide";
import type { NewRide } from "../types/ride";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store/store";
import PublishFallback from "../components/PublishFallback";
import { showNotification } from "../store/notificationsSlice";

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
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    min-height: 100vh;
    width: 100%;
    padding: 2rem 1.5rem;
    background: ${({ theme }) => theme.colors.background};

    opacity: 0;
    animation: ${fadeUp} 0.8s ease forwards;

    @media (max-width: 900px) {
        padding: 1.5rem 1rem;
    }

    @media (max-width: 640px) {
        padding: 1rem;
    }

    @media (min-width: 1600px) {
        padding: 3rem 2rem;
    }

    @media (min-width: 1920px) {
        padding: 4rem 2.5rem;
    }
`;

const IntroText = styled.div`
    text-align: center;
    padding-bottom: 2.5rem;
    max-width: 900px;

    @media (max-width: 900px) {
        padding-bottom: 1.75rem;
    }

    @media (max-width: 640px) {
        padding-bottom: 1.25rem;
    }

    @media (min-width: 1600px) {
        padding-bottom: 3rem;
    }

    @media (min-width: 1920px) {
        padding-bottom: 3.5rem;
    }

    h1 {
        margin-bottom: 1.3rem;
        color: ${({ theme }) => theme.colors.foreground};
        font-size: 2.4rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        animation: ${fadeUp} 0.8s ease forwards;
        animation-delay: 0.1s;

        @media (max-width: 640px) {
            font-size: 1.8rem;
            margin-bottom: 1rem;
        }

        @media (min-width: 1600px) {
            font-size: 2.8rem;
            margin-bottom: 1.5rem;
        }

        @media (min-width: 1920px) {
            font-size: 3rem;
            margin-bottom: 2rem;
        }
    }

    p {
        margin: 0 auto;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.mutedForeground || "#555"};
        max-width: 700px;
        line-height: 1.6;
        animation: ${fadeUp} 0.8s ease forwards;
        animation-delay: 0.2s;

        @media (max-width: 640px) {
            font-size: 1rem;
            max-width: 90%;
        }

        @media (min-width: 1600px) {
            font-size: 1.3rem;
            line-height: 1.75;
            max-width: 850px;
        }

        @media (min-width: 1920px) {
            font-size: 1.4rem;
            line-height: 1.8;
            max-width: 900px;
        }
    }
`;

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 900px;

    opacity: 0;
    animation: ${fadeInScale} 0.8s ease forwards;
    animation-delay: 0.3s;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    @media (max-width: 900px) {
        max-width: 100%;
        padding: 0 1rem;
    }

    @media (max-width: 640px) {
        padding: 0 0.5rem;
    }

    @media (min-width: 1600px) {
        max-width: 1050px;
    }

    @media (min-width: 1920px) {
        max-width: 1150px;
    }
`;

export default function PublishPage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const { mutate, isPending, isSuccess, error, data } = useCreateRide();
    const dispatch = useDispatch<AppDispatch>();

    if (!user) {
        return <PublishFallback />;
    }
    function handleSubmit(values: NewRide) {
        mutate(values, {
            onSuccess: () => {
                dispatch(
                    showNotification({
                        type: "success",
                        message: "Ride published successfully!",
                    })
                ),
                    navigate("/");
            },
            onError: (err: any) => {
                dispatch(
                    showNotification({
                        type: "error",
                        message: err.message || "Failed to publish ride",
                    })
                );
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
