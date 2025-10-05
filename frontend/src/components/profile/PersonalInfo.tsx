import styled from "styled-components";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useProfile } from "../../hooks/useProfile";

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    font-family: ${({ theme }) => theme.fonts.body};
    border-radius: 16px;
    padding: 2rem;
    padding-top: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    @media (max-width: 900px) {
        padding: 1.5rem;
    }

    @media (max-width: 640px) {
        padding: 1.25rem;
        border-radius: 12px;
    }

    @media (min-width: 1600px) {
        padding: 2.5rem;
    }

    @media (min-width: 1920px) {
        padding: 3rem;
    }
`;

const Title = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: #353333;
    margin-bottom: 1.5rem;
    transition: font-size 0.3s ease;

    @media (max-width: 900px) {
        font-size: 1.35rem;
        margin-bottom: 1.25rem;
    }

    @media (max-width: 640px) {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        text-align: center;
    }

    @media (min-width: 1600px) {
        font-size: 1.75rem;
    }

    @media (min-width: 1920px) {
        font-size: 1.9rem;
    }
`;

const Form = styled.form`
    display: grid;
    gap: 20px;

    @media (min-width: 640px) {
        grid-template-columns: 1fr 1fr;
        gap: 24px;
    }

    @media (min-width: 1600px) {
        gap: 28px;
    }

    @media (min-width: 1920px) {
        gap: 32px;
    }
`;

const Group = styled.div`
    display: flex;
    flex-direction: column;

    @media (max-width: 640px) {
        width: 100%;
    }
`;

const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #2b2d2f;
    transition: font-size 0.3s ease;

    @media (max-width: 900px) {
        font-size: 0.82rem;
    }

    @media (max-width: 640px) {
        font-size: 0.8rem;
    }

    @media (min-width: 1600px) {
        font-size: 0.95rem;
    }

    @media (min-width: 1920px) {
        font-size: 1rem;
    }
`;

const Input = styled.input`
    font-family: ${({ theme }) => theme.fonts.body};
    border: 1px solid #d1d5db;
    border-radius: 8px;
    margin-bottom: 0.4rem;
    padding: 10px 14px;
    font-size: 0.9rem;
    background: ${({ disabled }) => (disabled ? "#f9fafb" : "#fff")};
    color: ${({ disabled }) => (disabled ? "#9ca3af" : "#111827")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #10b981;
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
    }

    @media (max-width: 900px) {
        font-size: 0.85rem;
        padding: 8px 12px;
    }

    @media (max-width: 640px) {
        font-size: 0.8rem;
        padding: 8px 10px;
    }

    @media (min-width: 1600px) {
        font-size: 1rem;
        padding: 12px 16px;
    }

    @media (min-width: 1920px) {
        font-size: 1.05rem;
        padding: 14px 18px;
    }
`;

const Textarea = styled.textarea`
    font-family: ${({ theme }) => theme.fonts.body};
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 14px 18px;
    font-size: 0.9rem;
    resize: vertical;
    background: ${({ disabled }) => (disabled ? "#f9fafb" : "#fff")};
    color: ${({ disabled }) => (disabled ? "#9ca3af" : "#111827")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #10b981;
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
    }

    @media (max-width: 900px) {
        font-size: 0.85rem;
        padding: 12px 14px;
    }

    @media (max-width: 640px) {
        font-size: 0.8rem;
        padding: 10px 12px;
    }

    @media (min-width: 1600px) {
        font-size: 1rem;
        padding: 16px 20px;
    }

    @media (min-width: 1920px) {
        font-size: 1.05rem;
        padding: 18px 22px;
    }
`;

type Props = {
    isEditing: boolean;
};

const PersonalInfo = forwardRef(({ isEditing }: Props, ref) => {
    const { data: profileUser } = useProfile();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        bio: "",
    });

    useEffect(() => {
        if (profileUser) {
            setFormData({
                username: profileUser.username || "",
                email: profileUser.email || "",
                phoneNumber: profileUser.phoneNumber || "",
                bio: profileUser.bio || "",
            });
        }
    }, [profileUser]);

    useImperativeHandle(ref, () => ({ formData }));

    function handleChange(field: keyof typeof formData, value: string) {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }

    return (
        <Card>
            <Title>Personal Information</Title>
            <Form>
                <Group>
                    <Label>Full Name</Label>
                    <Input
                        type="text"
                        value={formData.username}
                        placeholder="e.g. John Doe"
                        disabled={!isEditing}
                        onChange={(e) =>
                            handleChange("username", e.target.value)
                        }
                    />
                </Group>
                <Group>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={formData.email}
                        placeholder="e.g. john.doe@email.com"
                        disabled={!isEditing}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </Group>
                <Group>
                    <Label>Phone Number</Label>
                    <Input
                        type="tel"
                        value={formData.phoneNumber}
                        placeholder="e.g. +1 555 123 4567"
                        disabled={!isEditing}
                        onChange={(e) =>
                            handleChange("phoneNumber", e.target.value)
                        }
                    />
                </Group>
                <Group style={{ gridColumn: "1 / -1" }}>
                    <Label>Bio</Label>
                    <Textarea
                        rows={3}
                        value={formData.bio}
                        placeholder="e.g. Eco-conscious traveler who loves meeting new people"
                        disabled={!isEditing}
                        onChange={(e) => handleChange("bio", e.target.value)}
                    />
                </Group>
            </Form>
        </Card>
    );
});

export default PersonalInfo;
