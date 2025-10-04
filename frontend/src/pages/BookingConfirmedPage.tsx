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
    padding: 5px 0 80px;
    font-family: ${({ theme }) => theme.fonts.body};

    opacity: 0;
    animation: ${fadeSlideUp} 0.7s ease forwards;
`;

const Header = styled.header`
    text-align: center;
    margin: 10px 0 24px;

    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.15s;
`;

const IconWrapper = styled.div`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(20, 184, 166, 0.12);
    margin: 0 auto;
    margin-bottom: 1rem;

    opacity: 0;
    animation: ${fadeScale} 0.6s ease forwards;
    animation-delay: 0.25s;
`;

const Icon = styled(CheckCircle).attrs({ size: 50, strokeWidth: 2.5 })`
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin: 12px 0 19px;
    color: #0f172a;
    font-weight: 800;

    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.35s;
`;

const Subtitle = styled.p`
    margin: 0 0 0.4rem 0;
    color: #475569;

    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.45s;
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
    margin-top: 10px;
    margin-bottom: 0.7rem;

    opacity: 0;
    animation: ${fadeScale} 0.6s ease forwards;
    animation-delay: 0.55s;
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
`;

const ButtonsRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 35px;

    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.85s;

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`;

const BtnInner = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 8px;
`;

const Primary = styled.button`
    height: 44px;
    border: 0;
    border-radius: 10px;
    font-weight: 700;
    color: #fff;
    background: ${({ theme }) => theme.colors.gradientHero};
    cursor: pointer;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
        background: ${({ theme }) => theme.colors.primaryDark};
    }
    &:active {
        transform: translateY(0);
    }
`;

const Ghost = styled.button`
    height: 44px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #fff;
    font-weight: 700;
    cursor: pointer;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
        background: #fbfcfc;
    }
    &:active {
        transform: translateY(0);
    }
`;

const Narrow = styled.div`
    max-width: 760px;
    margin: 0 auto;
    width: 100%;
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
