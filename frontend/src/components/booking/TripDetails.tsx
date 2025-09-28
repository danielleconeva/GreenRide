import styled from "styled-components";
import { MapPin, Wallet } from "lucide-react";
import type { Ride } from "../../types/ride";

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 25px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const RouteBlock = styled.div`
    display: grid;
    gap: 8px;
    margin-bottom: 24px;
`;

const DotRow = styled.div`
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 12px;
    align-items: start;

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.primary};
        margin-top: 2px;
    }

    .text {
        display: grid;
        gap: 4px;
    }

    .title {
        font-weight: 600;
        color: #1f2937;
        font-size: 1rem;
    }

    .subtitle {
        color: #6b7280;
        font-size: 0.8rem;
    }
`;

const Connector = styled.div`
    margin-left: 6px;
    border-left: 2px dashed #d1d5db;
    height: 24px;
`;

const DividerTop = styled.div`
    border-top: 1px solid #e5e7eb;
    margin: 24px 0 20px;
`;

const StatsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;

    @media (max-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
`;

const Stat = styled.div`
    display: grid;
    gap: 4px;

    .label {
        color: #6b7280;
        font-size: 0.85rem;
        font-weight: 600;
    }

    .value {
        color: #1f2937;
        font-weight: 500;
        font-size: 0.95rem;
        margin-top: 0.3rem;
    }
`;

const DividerBottom = styled.div`
    border-top: 1px solid #e5e7eb;
    margin: 24px 0 20px;
`;

const SoftPanel = styled.div`
    padding: 25px;
    border-radius: 8px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    align-items: center;

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
        gap: 12px;
    }
`;

const Price = styled.div`
    display: grid;
    gap: 4px;

    .label {
        font-size: 0.9rem;
        color: #6b7280;
        font-weight: 500;
    }

    .value {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 600;
        font-size: 1.4rem;
    }
`;

const RightNote = styled.div`
    justify-self: end;
    text-align: right;
    font-size: 0.8rem;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 6px;

    @media (max-width: 520px) {
        justify-self: start;
        text-align: left;
    }
`;

type Props = { ride: Ride };

export default function TripDetails({ ride }: Props) {
    const dateLong = ride.departureDate
        ? new Date(ride.departureDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
          })
        : "-";

    const h = Math.floor(ride.durationMin / 60);
    const m = ride.durationMin % 60;

    return (
        <Card aria-labelledby="trip-title">
            <Title id="trip-title">
                <MapPin size={22} />
                Trip Details
            </Title>

            <RouteBlock>
                <DotRow>
                    <div className="dot" />
                    <div className="text">
                        <div className="title">{ride.from}</div>
                    </div>
                </DotRow>

                <Connector />

                <DotRow>
                    <div className="dot" />
                    <div className="text">
                        <div className="title">{ride.to}</div>
                    </div>
                </DotRow>
            </RouteBlock>

            <DividerTop />
            <StatsRow>
                <Stat>
                    <div className="label">Date</div>
                    <div className="value">{dateLong}</div>
                </Stat>
                <Stat>
                    <div className="label">Departure</div>
                    <div className="value">{ride.departureTime}</div>
                </Stat>
                <Stat>
                    <div className="label">Arrival</div>
                    <div className="value">{ride.arrivalTime}</div>
                </Stat>
                <Stat>
                    <div className="label">Duration</div>
                    <div className="value">
                        {h}h {m}m
                    </div>
                </Stat>
            </StatsRow>

            <DividerBottom />
            <SoftPanel>
                <Price>
                    <div className="label">Price per seat</div>
                    <div className="value">
                        € {ride.pricePerSeat.toFixed(0)}
                    </div>
                </Price>

                <RightNote aria-label="Payment note">
                    <Wallet size={16} />
                    Payment in cash to driver
                </RightNote>
            </SoftPanel>
        </Card>
    );
}
