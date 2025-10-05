import styled from "styled-components";
import { Calendar, Clock, DollarSign, Leaf, Phone } from "lucide-react";
import useDriver from "../../hooks/useDriver";

const Container = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    padding: 20px;
`;

const Title = styled.h3`
    margin: 0 0 24px;
    font-size: 1.375rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.3;
`;

const RouteBlock = styled.div`
    display: grid;
    gap: 8px;
    margin-bottom: 24px;
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 12px;
    align-items: start;

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.primary};
        margin-top: 8px;
    }

    .text {
        display: grid;
        gap: 4px;
    }
`;

const Connector = styled.div`
    margin: 7px 0 7px 30px;
    border-left: 2px dashed #d1d5db;
    height: 38px;
`;

const LocationText = styled.div`
    strong {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
        line-height: 1.4;
    }

    div {
        color: #6b7280;
        font-size: 0.9rem;
        line-height: 1.4;
        margin-top: 4px;
    }
`;

const DriverSection = styled.div`
    margin-top: 32px;

    > strong {
        font-size: 1.375rem;
        font-weight: 700;
        color: #111827;
        display: block;
        margin-bottom: 30px;
    }
`;

const DriverInfo = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    padding-left: 2rem;
    margin-bottom: 2rem;
`;

const DriverAvatar = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #f2f7f6;
    border: 1px solid #cbd9d7;
    color: #0f766e;
    font-weight: 700;
    font-size: 1rem;
    flex-shrink: 0;
    margin-right: 0.5rem;
    margin-top: 5px;
`;

const DriverDetails = styled.div`
    > div:first-child {
        font-weight: 600;
        font-size: 1.1rem;
        color: #111827;
        margin-bottom: 10px;
    }

    > div:last-child {
        color: #64748b;
        margin-top: 7px;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 6px;

        a {
            color: inherit;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }

        svg {
            width: 16px;
            height: 16px;
        }
    }
`;

const PaymentInfo = styled.div`
    background: #fffbeb;
    border: 1px solid #fef3c7;
    border-radius: 16px;
    padding: 25px;
    margin-top: 24px;
    margin-bottom: 10px;

    > strong {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
        display: block;
        margin-bottom: 8px;
    }

    > div {
        color: #7c6f37;
        font-size: 0.9375rem;
        line-height: 1.5;

        b {
            font-weight: 700;
            color: #6b5b00;
        }
    }
`;

const NoteSection = styled.div`
    margin-top: 24px;

    > strong {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
        display: block;
        margin-bottom: 8px;
    }

    > div {
        color: #475569;
        font-size: 0.9375rem;
        line-height: 1.5;
        padding: 16px;
        background: #f8fafc;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
    }
`;

const StatsStrip = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
    border-radius: 12px;
    border: 1px solid #edf6f6;
    background: #f6fefe;
    overflow: hidden;
    margin-top: 8px;
    padding: 1rem;

    @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
        border-radius: 12px;
    }
    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`;

const StatItem = styled.div`
    display: grid;
    grid-template-columns: 27px 1fr;
    align-items: center;
    gap: 10px;
    padding: 19px 18px;
    border-right: 1px solid #d1fae5;

    &:last-child {
        border-right: 0;
    }

    @media (max-width: 640px) {
        border-right: 0;
        border-bottom: 1px solid #d1fae5;
        &:nth-last-child(1) {
            border-bottom: 0;
        }
    }

    svg {
        width: 18px;
        height: 18px;
        color: #0ea5a6;
    }
`;

const StatText = styled.div`
    display: grid;
    gap: 2px;
`;

const StatLabel = styled.div`
    font-size: 0.8125rem;
    color: #768396;
    font-weight: 400;
`;

const StatValue = styled.div`
    font-weight: 500;
    color: #43474f;
    font-size: 0.975rem;
`;

type Props = {
    from: string;
    to: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    durationMin: number;
    driver: { _id: string; username: string; rating?: number };
    seatsBooked: number;
    pricePerSeat: number;
    totalPrice: number;
    noteToDriver?: string;
    co2SavedKg?: number;
};

function formatDuration(min: number) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h ? `${h}h ` : ""}${m ? `${m}m` : ""}`.trim();
}

export default function BookingSummary(props: Props) {
    const {
        from,
        to,
        departureDate,
        departureTime,
        arrivalTime,
        durationMin,
        driver,
        seatsBooked,
        pricePerSeat,
        totalPrice,
        noteToDriver,
        co2SavedKg,
    } = props;

    const { data: driverPublic } = useDriver(driver?._id);
    const phone = driverPublic?.phoneNumber;

    return (
        <Container>
            <Title>Trip Details</Title>

            <RouteBlock>
                <Row>
                    <div className="dot" />
                    <div className="text">
                        <LocationText>
                            <strong>{from}</strong>
                            <div>Departure at {departureTime}</div>
                        </LocationText>
                    </div>
                </Row>

                <Connector />

                <Row>
                    <div className="dot" />
                    <div className="text">
                        <LocationText>
                            <strong>{to}</strong>
                            <div>Arrival at {arrivalTime}</div>
                        </LocationText>
                    </div>
                </Row>
            </RouteBlock>

            <StatsStrip>
                <StatItem>
                    <Calendar />
                    <StatText>
                        <StatLabel>Date</StatLabel>
                        <StatValue>
                            {new Date(departureDate).toLocaleDateString()}
                        </StatValue>
                    </StatText>
                </StatItem>

                <StatItem>
                    <Clock />
                    <StatText>
                        <StatLabel>Duration</StatLabel>
                        <StatValue>{formatDuration(durationMin)}</StatValue>
                    </StatText>
                </StatItem>

                <StatItem>
                    <DollarSign />
                    <StatText>
                        <StatLabel>Total Price</StatLabel>
                        <StatValue>${totalPrice}</StatValue>
                    </StatText>
                </StatItem>

                <StatItem>
                    <Leaf />
                    <StatText>
                        <StatLabel>CO₂ Saved</StatLabel>
                        <StatValue>
                            {co2SavedKg ?? `${seatsBooked * 5}kg`}
                        </StatValue>
                    </StatText>
                </StatItem>
            </StatsStrip>

            <DriverSection>
                <strong>Driver Information</strong>
                <DriverInfo>
                    <DriverAvatar>
                        {driver.username.slice(0, 2).toUpperCase()}
                    </DriverAvatar>
                    <DriverDetails>
                        <div>{driver.username}</div>
                        <div>
                            <Phone size={8} />
                            {phone ? (
                                <a href={`tel:${phone}`}>{phone}</a>
                            ) : (
                                <span>Phone not available</span>
                            )}
                        </div>
                    </DriverDetails>
                </DriverInfo>
            </DriverSection>

            <PaymentInfo>
                <strong>Payment Information</strong>
                <div>
                    Please pay <b>${pricePerSeat}</b> per seat in cash directly
                    to your driver at the start of the trip. Make sure to have
                    exact change if possible.
                </div>
            </PaymentInfo>

            {noteToDriver && (
                <NoteSection>
                    <strong>Your Note to Driver</strong>
                    <div>{noteToDriver}</div>
                </NoteSection>
            )}
        </Container>
    );
}
