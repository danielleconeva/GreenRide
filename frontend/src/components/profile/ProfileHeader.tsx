import styled from "styled-components";
import { Sprout, Car, Edit2 } from "lucide-react";

const Card = styled.section`
    font-family: ${({ theme }) => theme.fonts.body};
    background: #fff;
    border: 1px solid #e5e7eb;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

const AvatarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const Avatar = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #f3f8f8;
    color: #28b7ab;
    border: 2px solid #c9e4e0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-size: 2rem;
    margin-right: 2rem;
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Name = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #282a2f;
    margin: 0;
`;

const StatsRow = styled.div`
    display: flex;
    gap: 120px;
    align-items: center;
`;

const StatBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const StatValue = styled.div<{ color?: string }>`
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ color }) => color || "#111827"};
    line-height: 1;
    margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
    font-size: 0.875rem;
    color: #6b7280;
`;

const Badges = styled.div`
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
`;

const Badge = styled.span<{ bg?: string }>`
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${({ bg }) => bg || "#f3f4f6"};
    color: #111827;
    padding: 6px 12px;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 10px;

    svg {
        width: 14px;
        height: 14px;
    }
`;

const EditButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #d1d5db;
    background: #fff;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 0.875rem;
    margin-bottom: 7rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    height: fit-content;
    color: #454a51;

    svg {
        width: 16px;
        height: 16px;
    }

    &:hover {
        background: #f9fafb;
        border-color: #9ca3af;
    }
`;

type Props = {
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
};

export default function ProfileHeader({ isEditing, setIsEditing }: Props) {
    const name = "John Doe";
    const initials = name
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <Card>
            <LeftSection>
                <AvatarWrapper>
                    <Avatar>{initials}</Avatar>
                </AvatarWrapper>

                <InfoSection>
                    <Name>{name}</Name>
                    <StatsRow>
                        <StatBox>
                            <StatValue color="#eacc43">24</StatValue>
                            <StatLabel>Total Rides</StatLabel>
                        </StatBox>
                        <StatBox>
                            <StatValue color="#6cc3b7">156kg</StatValue>
                            <StatLabel>CO₂ Saved</StatLabel>
                        </StatBox>
                    </StatsRow>
                    <Badges>
                        <Badge bg="#dcfce7">
                            <Sprout />
                            Eco Warrior
                        </Badge>
                        <Badge bg="#fee2e2">
                            <Car />
                            Driver
                        </Badge>
                    </Badges>
                </InfoSection>
            </LeftSection>

            <EditButton onClick={() => setIsEditing(!isEditing)}>
                <Edit2 />
                {isEditing ? "Save" : "Edit Profile"}
            </EditButton>
        </Card>
    );
}
