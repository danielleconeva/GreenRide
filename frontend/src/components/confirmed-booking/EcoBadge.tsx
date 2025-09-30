import styled from "styled-components";
import { Leaf } from "lucide-react";

const Box = styled.section`
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 30px;
    display: flex;
    flex-direction: column;

    margin-bottom: 16px;
    text-align: center;
`;

const Title = styled.h3`
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    display: inline-flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
    margin-bottom: 1rem;
    font-size: 1.1rem;
`;

const P = styled.p`
    margin: 0;
    color: #474d4c;
`;

const CTA = styled.button`
    margin: 20px auto;
    margin-bottom: 0;
    height: 40px;
    border: 0;
    border-radius: 999px;
    padding: 0 16px;
    font-weight: 600;
    color: #228d91;
    background: #ebfbfb;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(34, 141, 145, 0.1);
        background: #e6f8f8; /* very subtle */
    }

    /* click feedback */
    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 10px rgba(34, 141, 145, 0.1);
    }
`;

type Props = {
    ecoSavedKg?: number;
    onViewEco?: () => void;
};

export default function EcoBadge({ ecoSavedKg, onViewEco }: Props) {
    return (
        <Box>
            <Title>Congratulations on Your Green Choice!</Title>
            <P>
                {ecoSavedKg ? (
                    <>
                        By choosing ridesharing, you've saved{" "}
                        <b>{ecoSavedKg}kg</b> of CO₂ emissions.
                    </>
                ) : (
                    <>
                        By choosing ridesharing, you’re helping reduce CO₂
                        emissions.
                    </>
                )}{" "}
                That's equivalent to planting a small tree! 🌳
            </P>
            <CTA onClick={onViewEco}>
                <Leaf size={14} style={{ marginRight: 6 }} />
                View Your Eco Impact
            </CTA>
        </Box>
    );
}
