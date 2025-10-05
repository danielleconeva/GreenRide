import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import type { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { showNotification } from "../../store/notificationsSlice";

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
`;

const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2b2d2f;
    transition: font-size 0.3s ease;

    @media (max-width: 640px) {
        font-size: 0.8rem;
        margin-bottom: 0.75rem;
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
    padding: 8px 12px;
    font-size: 0.875rem;
    background: ${({ disabled }) => (disabled ? "#f9fafb" : "#fff")};
    color: ${({ disabled }) => (disabled ? "#9ca3af" : "#111827")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
    transition: all 0.2s ease;

    @media (max-width: 640px) {
        font-size: 0.8rem;
        padding: 7px 10px;
    }

    @media (min-width: 1600px) {
        font-size: 0.95rem;
        padding: 10px 14px;
    }

    @media (min-width: 1920px) {
        font-size: 1rem;
        padding: 12px 16px;
    }
`;

type Props = {
    isEditing: boolean;
};

export default function CarDetails({ isEditing }: Props) {
    const { data: profileUser } = useProfile();
    const dispatch = useDispatch<AppDispatch>();
    const updateProfile = useUpdateProfile();

    if (!profileUser) return null;

    function handleChange(field: string, value: string) {
        if (!isEditing) return;
        const newCar = { ...profileUser!.car, [field]: value };

        updateProfile.mutate(
            { car: newCar },
            {
                onSuccess: () => {
                    dispatch(
                        showNotification({
                            type: "success",
                            message: "Car details updated successfully",
                        })
                    );
                },
                onError: (err: any) => {
                    dispatch(
                        showNotification({
                            type: "error",
                            message:
                                err?.message || "Failed to update car details",
                        })
                    );
                },
            }
        );
    }

    return (
        <Card>
            <Title>Vehicle Information</Title>
            <Form>
                <Group>
                    <Label>Make</Label>
                    <Input
                        type="text"
                        value={profileUser.car?.make || ""}
                        placeholder="e.g. Toyota"
                        disabled={!isEditing}
                        onChange={(e) => handleChange("make", e.target.value)}
                    />
                </Group>
                <Group>
                    <Label>Model</Label>
                    <Input
                        type="text"
                        value={profileUser.car?.model || ""}
                        placeholder="e.g. Prius"
                        disabled={!isEditing}
                        onChange={(e) => handleChange("model", e.target.value)}
                    />
                </Group>
                <Group>
                    <Label>Year</Label>
                    <Input
                        type="text"
                        value={profileUser.car?.year || ""}
                        placeholder="e.g. 2022"
                        disabled={!isEditing}
                        onChange={(e) => handleChange("year", e.target.value)}
                    />
                </Group>
                <Group>
                    <Label>Color</Label>
                    <Input
                        type="text"
                        value={profileUser.car?.color || ""}
                        placeholder="e.g. Silver"
                        disabled={!isEditing}
                        onChange={(e) => handleChange("color", e.target.value)}
                    />
                </Group>
                <Group>
                    <Label>License Plate</Label>
                    <Input
                        type="text"
                        value={profileUser.car?.licensePlate || ""}
                        placeholder="e.g. ECO 123"
                        disabled={!isEditing}
                        onChange={(e) =>
                            handleChange("licensePlate", e.target.value)
                        }
                    />
                </Group>
            </Form>
        </Card>
    );
}
