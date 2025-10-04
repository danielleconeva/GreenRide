import styled from "styled-components";
import { useState, useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";
import { showNotification } from "../../store/notificationsSlice";
import type { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";

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

const Textarea = styled.textarea`
    font-family: ${({ theme }) => theme.fonts.body};
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 15px 20px;
    font-size: 0.875rem;
    resize: vertical;
    background: ${({ disabled }) => (disabled ? "#f9fafb" : "#fff")};
    color: ${({ disabled }) => (disabled ? "#9ca3af" : "#111827")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
`;

type Props = {
    isEditing: boolean;
};

export default function PersonalInfo({ isEditing }: Props) {
    const { data: profileUser, refetch } = useProfile();
    const dispatch = useDispatch<AppDispatch>();

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

    async function handleChange(field: keyof typeof formData, value: string) {
        setFormData((prev) => ({ ...prev, [field]: value }));

        if (isEditing) {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/users/profile",
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({ [field]: value }),
                    }
                );

                if (!response.ok) throw new Error("Failed to update profile");

                await refetch();

                dispatch(
                    showNotification({
                        type: "success",
                        message: "Profile updated successfully",
                    })
                );
            } catch (err: any) {
                dispatch(
                    showNotification({
                        type: "error",
                        message: err?.message || "Profile update failed",
                    })
                );
            }
        }
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
}
