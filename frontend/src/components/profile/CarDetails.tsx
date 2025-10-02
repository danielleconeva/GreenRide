import styled from "styled-components";

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    font-family: ${({ theme }) => theme.fonts.body};
    border-radius: 16px;
    padding: 2rem;
    padding-top: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: #353333;
    margin-bottom: 1.5rem;
`;

const Form = styled.form`
    display: grid;
    gap: 20px;

    @media (min-width: 640px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Group = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2b2d2f;
`;

const Input = styled.input`
    font-family: ${({ theme }) => theme.fonts.body};
    border: 1px solid #d1d5db;
    border-radius: 8px;
    margin-bottom: 0.4rem;
    padding: 8px 12px;
    font-size: 0.875rem;
    background: ${({ disabled }) => (disabled ? "#f9fafb" : "#fff")};
    color: ${({ disabled }) => (disabled ? "#9ca3af" : "#111827")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
`;

type Props = {
    isEditing: boolean;
};

export default function CarDetails({ isEditing }: Props) {
    return (
        <Card>
            <Title>Vehicle Information</Title>
            <Form>
                <Group>
                    <Label>Make</Label>
                    <Input
                        type="text"
                        defaultValue="Toyota"
                        disabled={!isEditing}
                    />
                </Group>
                <Group>
                    <Label>Model</Label>
                    <Input
                        type="text"
                        defaultValue="Prius"
                        disabled={!isEditing}
                    />
                </Group>
                <Group>
                    <Label>Year</Label>
                    <Input
                        type="text"
                        defaultValue="2022"
                        disabled={!isEditing}
                    />
                </Group>
                <Group>
                    <Label>Color</Label>
                    <Input
                        type="text"
                        defaultValue="Silver"
                        disabled={!isEditing}
                    />
                </Group>
                <Group>
                    <Label>License Plate</Label>
                    <Input
                        type="text"
                        defaultValue="ECO 123"
                        disabled={!isEditing}
                    />
                </Group>
            </Form>
        </Card>
    );
}
