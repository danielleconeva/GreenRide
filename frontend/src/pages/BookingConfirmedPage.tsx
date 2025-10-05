import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { CheckCircle, Home, Leaf } from "lucide-react";
import BookingSummary from "../components/confirmed-booking/BookingSummary";
import NextSteps from "../components/confirmed-booking/NextSteps";
import EcoBadge from "../components/confirmed-booking/EcoBadge";

type LocationState = {
    bookingId: string;
    rideId: string;
    seatsBooked: number;
    noteToDriver?: string;
    totalPrice: number;
    ecoSavedKg?: number;
    rideSnapshot: {
        from: string;
        to: string;
        departureDate: string;
        departureTime: string;
        arrivalTime: string;
        durationMin: number;
        driver: { _id: string; username: string; rating?: number };
        pricePerSeat: number;
    };
};

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeScale = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;
const Wrap = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 1rem 1.25rem 4rem;
    font-family: ${({ theme }) => theme.fonts.body};
    opacity: 0;
    animation: ${fadeSlideUp} 0.7s ease forwards;

    @media (max-width: 900px) {
        padding: 0.75rem 1rem 3rem;
    }

    @media (max-width: 640px) {
        padding: 0.5rem 1rem 2.5rem;
    }

    @media (min-width: 1600px) {
        max-width: 1400px;
    }

    @media (min-width: 1920px) {
        max-width: 1600px;
    }
`;

const Header = styled.header`
    text-align: center;
    margin: 1.25rem 0 2.25rem;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.15s;

    @media (max-width: 640px) {
        margin: 0.75rem 0 1.5rem;
    }

    @media (min-width: 1600px) {
        margin: 2rem 0 3.25rem;
    }

    @media (min-width: 1920px) {
        margin: 2.5rem 0 3.75rem;
    }
`;

const IconWrapper = styled.div`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(20, 184, 166, 0.12);
    margin: 0 auto 1.2rem;
    opacity: 0;
    animation: ${fadeScale} 0.6s ease forwards;
    animation-delay: 0.25s;

    @media (max-width: 640px) {
        width: 4rem;
        height: 4rem;
        margin-bottom: 0.8rem;
    }

    @media (min-width: 1600px) {
        width: 7rem;
        height: 7rem;
        margin-bottom: 1.75rem;
    }

    @media (min-width: 1920px) {
        width: 8rem;
        height: 8rem;
        margin-bottom: 2rem;
    }
`;

const Icon = styled(CheckCircle).attrs({ size: 50, strokeWidth: 2.5 })`
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;

    @media (max-width: 640px) {
        width: 36px;
        height: 36px;
    }

    @media (min-width: 1600px) {
        width: 64px;
        height: 64px;
    }

    @media (min-width: 1920px) {
        width: 72px;
        height: 72px;
    }
`;

const Title = styled.h1`
    font-size: 2rem;
    margin: 1rem 0 1.25rem;
    color: #0f172a;
    font-weight: 800;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.35s;

    @media (max-width: 640px) {
        font-size: 1.5rem;
        margin: 0.75rem 0 1rem;
    }

    @media (min-width: 1600px) {
        font-size: 2.4rem;
        margin: 1.25rem 0 1.75rem;
    }

    @media (min-width: 1920px) {
        font-size: 2.8rem;
        margin: 1.5rem 0 2rem;
    }
`;

const Subtitle = styled.p`
    margin: 0 0 0.6rem;
    color: #475569;
    font-size: 1rem;
    line-height: 1.5;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.45s;

    @media (max-width: 640px) {
        font-size: 0.9rem;
    }

    @media (min-width: 1600px) {
        font-size: 1.15rem;
        line-height: 1.6;
    }

    @media (min-width: 1920px) {
        font-size: 1.25rem;
        line-height: 1.7;
    }
`;

const Badge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.9rem;
    background: #f1f5f9;
    color: #36393e;
    margin-top: 12px;
    margin-bottom: 0.8rem;
    opacity: 0;
    animation: ${fadeScale} 0.6s ease forwards;
    animation-delay: 0.55s;

    @media (max-width: 640px) {
        font-size: 0.8rem;
        padding: 4px 10px;
    }

    @media (min-width: 1600px) {
        font-size: 1rem;
        padding: 8px 14px;
    }

    @media (min-width: 1920px) {
        font-size: 1.1rem;
        padding: 10px 16px;
    }
`;

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    margin-bottom: 2.5rem;
    opacity: 0;
    animation: ${fadeScale} 0.6s ease forwards;
    animation-delay: 0.65s;

    @media (max-width: 640px) {
        padding: 16px;
        margin-bottom: 1.75rem;
    }

    @media (min-width: 1600px) {
        padding: 32px;
        border-radius: 20px;
        margin-bottom: 3rem;
    }

    @media (min-width: 1920px) {
        padding: 40px;
        border-radius: 24px;
        margin-bottom: 3.5rem;
    }
`;

const ButtonsRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 35px;
    flex-wrap: wrap;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.85s;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-top: 28px;
    }

    @media (min-width: 1600px) {
        gap: 18px;
        margin-top: 48px;
    }

    @media (min-width: 1920px) {
        gap: 24px;
        margin-top: 56px;
    }
`;

const BtnInner = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    @media (min-width: 1600px) {
        gap: 10px;
    }

    @media (min-width: 1920px) {
        gap: 12px;
    }
`;

const Primary = styled.button`
    height: 44px;
    min-width: 180px;
    border: 0;
    border-radius: 10px;
    font-weight: 700;
    color: #fff;
    background: ${({ theme }) => theme.colors.gradientHero};
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.25s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
        background: ${({ theme }) => theme.colors.primaryDark};
    }

    @media (max-width: 640px) {
        height: 38px;
        min-width: 150px;
        font-size: 0.9rem;
    }

    @media (min-width: 1600px) {
        height: 50px;
        min-width: 200px;
        font-size: 1.1rem;
        border-radius: 12px;
    }

    @media (min-width: 1920px) {
        height: 56px;
        min-width: 220px;
        font-size: 1.2rem;
        border-radius: 14px;
    }
`;

const Ghost = styled(Primary)`
    background: #fff;
    color: #111827;
    border: 1px solid #e5e7eb;

    &:hover {
        background: #fbfcfc;
    }
`;

const Narrow = styled.div`
    max-width: 760px;
    margin: 0 auto;
    width: 100%;

    @media (max-width: 640px) {
        max-width: 100%;
    }

    @media (min-width: 1600px) {
        max-width: 900px;
    }

    @media (min-width: 1920px) {
        max-width: 1000px;
    }
`;

export default function BookingConfirmedPage() {
    const navigate = useNavigate();
    const { state } = useLocation() as { state?: LocationState };

    if (!state) {
        return (
            <Wrap>
                <Header>
                    <IconWrapper>
                        <Icon aria-hidden="true" />
                    </IconWrapper>
                    <Title>Booking Details Unavailable</Title>
                    <Subtitle>
                        We couldn’t find your confirmation details. Please
                        reopen this page from the booking flow or check your
                        bookings.
                    </Subtitle>
                </Header>
                <Narrow>
                    <ButtonsRow>
                        <Primary onClick={() => navigate("/")}>
                            <BtnInner>
                                <Home size={18} />
                                Back to Home
                            </BtnInner>
                        </Primary>
                        <Ghost onClick={() => navigate("/search")}>
                            <BtnInner>Book Another Ride</BtnInner>
                        </Ghost>
                    </ButtonsRow>
                </Narrow>
            </Wrap>
        );
    }

    const {
        bookingId,
        seatsBooked,
        totalPrice,
        ecoSavedKg,
        rideSnapshot,
        noteToDriver,
    } = state;

    return (
        <Wrap>
            <Header>
                <IconWrapper>
                    <Icon aria-hidden="true" />
                </IconWrapper>
                <Title>Booking Confirmed!</Title>
                <Subtitle>
                    Your ride has been successfully booked. Get ready for your
                    eco-friendly journey!
                </Subtitle>
                <Badge>
                    <Leaf size={16} />
                    Booking ID: {bookingId}
                </Badge>
            </Header>

            <Narrow>
                <Card>
                    <BookingSummary
                        from={rideSnapshot.from}
                        to={rideSnapshot.to}
                        departureDate={rideSnapshot.departureDate}
                        departureTime={rideSnapshot.departureTime}
                        arrivalTime={rideSnapshot.arrivalTime}
                        durationMin={rideSnapshot.durationMin}
                        driver={rideSnapshot.driver}
                        seatsBooked={seatsBooked}
                        pricePerSeat={rideSnapshot.pricePerSeat}
                        totalPrice={totalPrice}
                        noteToDriver={noteToDriver}
                    />
                </Card>
                <Card style={{ marginTop: 16 }}>
                    <NextSteps />
                </Card>

                <EcoBadge
                    ecoSavedKg={ecoSavedKg}
                    onViewEco={() => navigate("/eco-impact")}
                />

                <ButtonsRow>
                    <Primary onClick={() => navigate("/")}>
                        <BtnInner>
                            <Home size={18} />
                            Back to Home
                        </BtnInner>
                    </Primary>
                    <Ghost onClick={() => navigate("/search")}>
                        <BtnInner>Book Another Ride</BtnInner>
                    </Ghost>
                </ButtonsRow>
            </Narrow>
        </Wrap>
    );
}
