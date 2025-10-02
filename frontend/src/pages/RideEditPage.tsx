import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PublishForm from "../components/PublishForm";
import useRide from "../hooks/useRide";
import type { Ride } from "../types/ride";

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

export default function RideEditPage() {
    const { rideId } = useParams<{ rideId: string }>();
    const navigate = useNavigate();
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
                    navigate("/");
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

            <PublishForm
                initialValues={ride} // 👈 prefill form with ride data
                onSubmit={handleSubmit}
                submitting={updateStatus === "pending"}
                serverError={error ? (error as Error).message : undefined}
            />
        </MainWrapper>
    );
}
