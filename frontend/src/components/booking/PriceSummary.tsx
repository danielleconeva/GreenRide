import styled from "styled-components";
import { DollarSign } from "lucide-react";

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    margin: 0 0 25px;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    color: #1f2937;
    padding: 8px 0;
    font-size: 0.95rem;
    font-weight: 500;
`;

const Divider = styled.div`
    border-top: 1px solid #e5e7eb;
    margin: 16px 0;
`;

const TotalRow = styled(Row)`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.4rem;
    padding: 12px 0;
`;

type Props = {
    pricePerSeat: number;
    passengers: number;
};

export default function PriceSummary({ pricePerSeat, passengers }: Props) {
    const total = pricePerSeat * passengers;

    return (
        <Card aria-label="Price Summary">
            <Title>
                <DollarSign size={18} />
                Price Summary
            </Title>
            <Row>
                <span>Price per seat</span>
                <span>€ {pricePerSeat.toFixed(0)}</span>
            </Row>
            <Row>
                <span>Passengers</span>
                <span>{passengers}</span>
            </Row>
            <Divider />
            <TotalRow>
                <span>Total</span>
                <span>€ {total.toFixed(0)}</span>
            </TotalRow>
        </Card>
    );
}
