import styled from "styled-components";

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
`;

const Title = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 16px;
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
    font-weight: 500;
    margin-bottom: 6px;
    color: #374151;
`;

const Input = styled.input`
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 0.875rem;
`;

const Textarea = styled.textarea`
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 0.875rem;
    resize: vertical;
`;

export default function PersonalInfo() {
    return (
        <Card>
            <Title>Personal Information</Title>
            <Form>
                <Group>
                    <Label>Full Name</Label>
                    <Input type="text" defaultValue="John Doe" />
                </Group>
                <Group>
                    <Label>Email</Label>
                    <Input type="email" defaultValue="john.doe@email.com" />
                </Group>
                <Group>
                    <Label>Phone Number</Label>
                    <Input type="tel" defaultValue="+1 (555) 987-6543" />
                </Group>
                <Group style={{ gridColumn: "1 / -1" }}>
                    <Label>Bio</Label>
                    <Textarea
                        rows={3}
                        defaultValue="Eco-conscious traveler who loves meeting new people on the road."
                    />
                </Group>
            </Form>
        </Card>
    );
}
