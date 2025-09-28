// src/components/booking/EcoBadge.tsx
import styled from "styled-components";
import { Leaf } from "lucide-react";
import type { Ride } from "../../types/ride";
import {
    incrementalBookingSavings,
    rideFullCapacitySavings,
} from "../../utils/eco";

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    display: grid;
    gap: 8px;
    text-align: center;
    margin: 1.5rem 0;
    .title {
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary};
        display: inline-flex;
        align-items: center;
        gap: 6px;
        justify-content: center;
        margin-bottom: 0.8rem;
        font-size: 1.1rem;
    }
    .sub {
        font-size: 0.9rem;
        margin-bottom: 0.4rem;
    }
`;

const StyledLeaf = styled(Leaf)`
    padding-top: 0.2rem;
    color: ${({ theme }) => theme.colors.primary};
`;

type Props = { ride: Ride; selectedPassengers: number };

export default function EcoBadge({ ride, selectedPassengers }: Props) {
    const existingPassengers = ride.passengers?.length ?? 0;

    const bookingKg = incrementalBookingSavings(
        ride.durationMin,
        selectedPassengers
    );
    const ridePotentialKg = rideFullCapacitySavings(
        ride.durationMin,
        existingPassengers,
        ride.seatsAvailable
    );

    return (
        <Card aria-label="Eco Impact">
            <div className="title">
                <StyledLeaf size={18} /> Eco Impact
            </div>
            <div className="sub">
                This booking saves ~{Math.round(bookingKg)}kg CO₂
            </div>
            <div className="sub">
                Ride potential savings: ~{Math.round(ridePotentialKg)}kg CO₂ vs.
                driving alone
            </div>
        </Card>
    );
}
