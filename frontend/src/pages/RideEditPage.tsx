import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import PublishForm from "../components/PublishForm";
import useRide from "../hooks/useRide";
import type { Ride } from "../types/ride";
import { showNotification } from "../store/notificationsSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeScale = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const MainWrapper = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 2rem;

    opacity: 0;
    animation: ${fadeInUp} 0.6s ease forwards;
`;

const IntroText = styled.div`
    text-align: center;
    padding-bottom: 2.5rem;
    opacity: 0;
    animation: ${fadeInUp} 0.7s ease forwards;
    animation-delay: 0.2s;

    h1 {
        margin-bottom: 1.3rem;
        font-size: 2.4rem;
        color: ${({ theme }) => theme.colors.foreground};
        font-weight: 700;
    }

    p {
        margin: 0;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.mutedForeground || "#555"};
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
    }
`;

const FormWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    opacity: 0;
    animation: ${fadeScale} 0.6s ease forwards;
    animation-delay: 0.35s;
`;
export default function RideEditPage() {
    const { rideId } = useParams<{ rideId: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {
        data: ride,
        isLoading,
        error,
        updateRide,
        updateStatus,
    } = useRide(rideId);

    function handleSubmit(values: Partial<Ride>) {
        if (!rideId) return;
        updateRide(
            { id: rideId, data: values },
            {
                onSuccess: () => {
                    dispatch(
                        showNotification({
                            type: "success",
                            message: "Ride updated successfully",
                        })
                    );
                    navigate("/");
                },
                onError: (err: any) => {
                    dispatch(
                        showNotification({
                            type: "error",
                            message: err?.message || "Failed to update ride",
                        })
                    );
                },
            }
        );
    }

    if (isLoading) {
        return (
            <MainWrapper>
                <p>Loading ride details...</p>
            </MainWrapper>
        );
    }

    if (error) {
        return (
            <MainWrapper>
                <p>Failed to load ride: {(error as Error).message}</p>
            </MainWrapper>
        );
    }

    if (!ride) {
        return (
            <MainWrapper>
                <p>Ride not found</p>
            </MainWrapper>
        );
    }

    return (
        <MainWrapper>
            <IntroText>
                <h1>Edit Ride</h1>
                <p>
                    Update your ride details and make sure travelers have the
                    most accurate info.
                </p>
            </IntroText>

            <FormWrapper>
                <PublishForm
                    initialValues={ride}
                    onSubmit={handleSubmit}
                    submitting={updateStatus === "pending"}
                    serverError={error ? (error as Error).message : undefined}
                />
            </FormWrapper>
        </MainWrapper>
    );
}
