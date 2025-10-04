import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ArrowLeft } from "lucide-react";

import TripDetails from "../components/booking/TripDetails";
import DriverInformation from "../components/booking/DriverInformation";
import BookingDetails, {
    type BookingDetailsState,
} from "../components/booking/BookingDetails";
import PriceSummary from "../components/booking/PriceSummary";
import EcoBadge from "../components/booking/EcoBadge";
import useRide from "../hooks/useRide";
import useCreateBooking from "../hooks/useCreateBooking";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeScale = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const TopBar = styled.div`
    max-width: 1100px;
    margin: 0 auto 12px;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
`;

const BackLink = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 500;
    font-size: 0.98rem;
    color: ${({ theme }) => theme.colors.primary};
    background: transparent;
    border: 0;
    padding: 6px 0;
    cursor: pointer;
    border-radius: 8px;
    transition: transform 0.15s ease, background-color 0.15s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.primaryDark};
    }
    &:active {
        transform: translateY(0);
    }
    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
    }
`;

const Page = styled.div`
    padding: 8px 0 80px;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
    font-family: ${({ theme }) => theme.fonts.body};

    opacity: 0;
    animation: ${fadeSlideUp} 0.7s ease forwards;
    animation-delay: 0.15s;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const Column = styled.div`
    display: grid;
    gap: 16px;

    > * {
        opacity: 0;
        animation: ${fadeSlideUp} 0.6s ease forwards;
    }

    > *:nth-child(1) {
        animation-delay: 0.2s;
    }
    > *:nth-child(2) {
        animation-delay: 0.3s;
    }
    > *:nth-child(3) {
        animation-delay: 0.4s;
    }
    > *:nth-child(4) {
        animation-delay: 0.5s;
    }
`;

const Aside = styled.div`
    position: sticky;
    top: 16px;
    display: grid;
    gap: 16px;
    height: fit-content;

    > * {
        opacity: 0;
        animation: ${fadeScale} 0.6s ease forwards;
    }

    > *:nth-child(1) {
        animation-delay: 0.25s;
    }
    > *:nth-child(2) {
        animation-delay: 0.35s;
    }
    > *:nth-child(3) {
        animation-delay: 0.45s;
    }
    > *:nth-child(4) {
        animation-delay: 0.55s;
    }
`;

const PrimaryBtn = styled.button`
    font-family: ${({ theme }) => theme.fonts.body};
    height: 44px;
    border-radius: 10px;
    border: 0;
    font-weight: 600;
    color: #fff;
    background: ${({ theme }) => theme.colors.gradientHero};
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        filter: brightness(1.02);
    }
    &:active {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
        filter: brightness(0.98);
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }
    &:focus-visible {
        outline: none;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05),
            0 0 0 3px rgba(16, 185, 129, 0.2);
    }
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

const GhostBtn = styled.button`
    font-family: ${({ theme }) => theme.fonts.body};
    height: 44px;
    border-radius: 10px;
    border: 1px solid #ebecef;
    background: #fff;
    color: #111827;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    &:hover {
        transform: translateY(-1px);
        border-color: #e0e4e9;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);
        background: #fffdfd;
    }
    &:active {
        transform: translateY(0);
        background: #f5f5f5;
        border-color: #9ca3af;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }
    &:focus-visible {
        outline: none;
        border-color: #10b981;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03),
            0 0 0 3px rgba(16, 185, 129, 0.15);
    }
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export default function BookingDetailsPage() {
    const user = useSelector((state: RootState) => state.auth.user);

    const { rideId } = useParams();
    const navigate = useNavigate();
    const { data: ride, isLoading, isError } = useRide(rideId);

    const [form, setForm] = useState<BookingDetailsState>({
        passengers: 1,
        note: "",
    });

    const { createBooking, isCreating, error } = useCreateBooking();

    const maxPassengers = useMemo(() => {
        if (!ride) return 1;
        const totalSeats = ride.seatsAvailable + (ride.passengers?.length ?? 0);
        return Math.max(1, Math.min(ride.seatsAvailable, totalSeats));
    }, [ride]);

    if ((isLoading && !ride) || !rideId) {
        return (
            <div style={{ maxWidth: 1100, margin: "24px auto" }}>
                Loading ride details…
            </div>
        );
    }
    if (isError || !ride) {
        return (
            <div style={{ maxWidth: 1100, margin: "24px auto" }}>
                Ride not found.
            </div>
        );
    }

    const handleConfirm = async () => {
        if (!user) {
            navigate("/login", { state: { from: `/rides/${rideId}/confirm` } });
            return;
        }
        try {
            const { booking } = await createBooking({
                rideId: ride._id,
                seatsBooked: form.passengers,
                noteToDriver: form.note?.trim() || undefined,
            });

            navigate(`/booking-confirmed/${ride._id}`, {
                state: {
                    bookingId: booking._id,
                    rideId: ride._id,
                    seatsBooked: form.passengers,
                    noteToDriver: form.note,
                    totalPrice: ride.pricePerSeat * form.passengers,
                    ecoSavedKg: ride.ecoImpact?.perPersonKg
                        ? Math.round(
                              ride.ecoImpact.perPersonKg * form.passengers
                          )
                        : undefined,
                    rideSnapshot: {
                        from: ride.from,
                        to: ride.to,
                        departureDate: ride.departureDate,
                        departureTime: ride.departureTime,
                        arrivalTime: ride.arrivalTime,
                        durationMin: ride.durationMin,
                        driver: ride.driver,
                        pricePerSeat: ride.pricePerSeat,
                    },
                },
                replace: true,
            });
        } catch {}
    };

    return (
        <>
            <TopBar>
                <BackLink
                    onClick={() => navigate(-1)}
                    aria-label="Back to results"
                >
                    <ArrowLeft size={18} /> Back to Results
                </BackLink>
            </TopBar>

            <Page>
                <Column>
                    <TripDetails ride={ride} />
                    <DriverInformation ride={ride} />
                    <BookingDetails
                        value={form}
                        maxPassengers={maxPassengers}
                        onChange={setForm}
                    />
                    {error && (
                        <div
                            role="alert"
                            style={{ color: "#b91c1c", fontWeight: 600 }}
                        >
                            {error.message}
                        </div>
                    )}
                </Column>

                <Aside>
                    <PriceSummary
                        pricePerSeat={ride.pricePerSeat}
                        passengers={form.passengers}
                    />
                    <EcoBadge
                        ride={ride}
                        selectedPassengers={form.passengers}
                    />
                    <PrimaryBtn onClick={handleConfirm} disabled={isCreating}>
                        {isCreating ? "Confirming…" : "Confirm Booking"}
                    </PrimaryBtn>
                    <GhostBtn onClick={() => navigate(-1)}>
                        Back to Results
                    </GhostBtn>
                </Aside>
            </Page>
        </>
    );
}
