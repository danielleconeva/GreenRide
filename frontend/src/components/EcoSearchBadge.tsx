import styled from "styled-components";
import { Leaf } from "lucide-react";

const StyledLeaf = styled(Leaf)`
    padding-top: 0.2rem;
`;

const Wrapper = styled.div`
    max-width: 500px;
    text-align: center;
    border-radius: 2rem;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.09);
    padding: 1rem;
    margin: 2rem 0;

    h4 {
        font-weight: 500;
        font-size: 1.1rem;
        color: ${({ theme }) => theme.colors.primary};
    }
    p {
        font-size: 1rem;
    }
`;

export default function EcoSearchBadge() {
    return (
        <>
            <Wrapper>
                <h4>
                    <StyledLeaf size={18} /> Make a Positive Impact
                </h4>
                <p>
                    Each shared ride saves approximately 15kg of CO₂ emissions
                    compared to driving alone. Help us build a more sustainable
                    future, one ride at a time.
                </p>
            </Wrapper>
        </>
    );
}
