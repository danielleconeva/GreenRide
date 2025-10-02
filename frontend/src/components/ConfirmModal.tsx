// components/common/ConfirmModal.tsx
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
`;

const ModalBox = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 400px;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #373333;
    font-weight: 600;
`;

const Message = styled.p`
    color: #666;
`;

const Buttons = styled.div`
    margin-top: 1.5rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
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
        
        &:hover {
          background: #0d9488;
        }
      `
            : `
        background: #f3f4f6;
        color: #111;
        
        &:hover {
          background: #e5e7eb;
        }
      `}
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
