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
    padding: 1.5rem;
    margin: 2rem auto;
    transition: all 0.25s ease;
    font-family: ${({ theme }) => theme.fonts.body};

    h4 {
        font-weight: 600;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.primary};
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        margin-bottom: 0.75rem;
    }

    p {
        font-size: 1rem;
        color: #444;
        line-height: 1.5;
        max-width: 90%;
        margin: 0 auto;
    }

    &:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    @media (max-width: 900px) {
        padding: 1.25rem;
        margin: 1.5rem auto;
        max-width: 90%;

        h4 {
            font-size: 1.1rem;
        }

        p {
            font-size: 0.95rem;
            max-width: 95%;
        }
    }

    @media (max-width: 640px) {
        padding: 1rem;
        margin: 1rem auto;
        border-radius: 1.5rem;

        h4 {
            font-size: 1rem;
        }

        p {
            font-size: 0.9rem;
        }
    }

    @media (min-width: 1600px) {
        max-width: 600px;
        padding: 2rem;

        h4 {
            font-size: 1.35rem;
        }

        p {
            font-size: 1.1rem;
        }
    }

    @media (min-width: 1920px) {
        max-width: 700px;
        padding: 2.5rem;

        h4 {
            font-size: 1.45rem;
        }

        p {
            font-size: 1.2rem;
            line-height: 1.65;
        }
    }
`;

export default function EcoSearchBadge() {
    return (
        <Wrapper>
            <h4>
                <StyledLeaf size={18} /> Make a Positive Impact
            </h4>
            <p>
                Each shared ride saves approximately 15 kg of CO₂ emissions
                compared to driving alone. Help us build a more sustainable
                future, one ride at a time.
            </p>
        </Wrapper>
    );
}
