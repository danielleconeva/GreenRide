import styled from "styled-components";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
`;

const ModalBox = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 400px;
    max-width: 100%;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.25s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @media (max-width: 640px) {
        padding: 1.5rem;
        width: 90%;
    }

    @media (min-width: 1600px) {
        padding: 2.5rem;
        width: 450px;
    }

    @media (min-width: 1920px) {
        padding: 3rem;
        width: 500px;
    }
`;

const Title = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #373333;
    font-weight: 600;

    @media (max-width: 640px) {
        font-size: 1.1rem;
    }

    @media (min-width: 1600px) {
        font-size: 1.35rem;
    }
`;

const Message = styled.p`
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 1.25rem;

    @media (max-width: 640px) {
        font-size: 0.9rem;
    }

    @media (min-width: 1600px) {
        font-size: 1rem;
    }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
`;

const Button = styled.button<{ $variant?: "cancel" | "confirm" }>`
    font-family: ${({ theme }) => theme.fonts.body};
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    ${({ $variant }) =>
        $variant === "confirm"
            ? `
        background: #14b8a6;
        color: white;
        &:hover { background: #0d9488; }
      `
            : `
        background: #f3f4f6;
        color: #111;
        &:hover { background: #e5e7eb; }
      `}

    @media (max-width: 640px) {
        padding: 0.55rem 1rem;
        font-size: 0.95rem;
    }

    @media (min-width: 1600px) {
        padding: 0.75rem 1.4rem;
        font-size: 1.05rem;
    }

    @media (min-width: 1920px) {
        padding: 0.85rem 1.6rem;
        font-size: 1.1rem;
    }
`;

type Props = {
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmModal({ onConfirm, onCancel }: Props) {
    return (
        <Overlay>
            <ModalBox>
                <Title>Are you sure you want to delete this ride?</Title>
                <Message>This action cannot be undone.</Message>
                <Buttons>
                    <Button $variant="cancel" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button $variant="confirm" onClick={onConfirm}>
                        Delete
                    </Button>
                </Buttons>
            </ModalBox>
        </Overlay>
    );
}
