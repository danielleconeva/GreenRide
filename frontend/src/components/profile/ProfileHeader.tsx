import { Sprout, Car, User as UserIcon, Edit2 } from "lucide-react";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";
import { useMyBookings } from "../../hooks/useBookings";
import { useAllRides } from "../../hooks/useAllRides";

export const Card = styled.section`
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
    max-width: 1100px;
    margin: 0 auto;

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: stretch;
        gap: 1.5rem;
        padding: 1.5rem;
    }

    @media (max-width: 640px) {
        padding: 1rem;
        gap: 1.25rem;
        max-width: 100%;
    }

    @media (min-width: 1600px) {
        max-width: 1300px;
        padding: 2rem 3rem;
        gap: 3rem;
    }

    @media (min-width: 1920px) {
        max-width: 1500px;
        padding: 2rem 4rem;
        gap: 3.5rem;
    }
`;

export const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;
    }

    @media (max-width: 640px) {
        gap: 0.75rem;
    }

    @media (min-width: 1600px) {
        gap: 36px;
    }

    @media (min-width: 1920px) {
        gap: 42px;
    }
`;

export const AvatarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export const Avatar = styled.div`
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

    @media (max-width: 900px) {
        width: 75px;
        height: 75px;
        font-size: 1.6rem;
        margin-right: 0;
    }

    @media (max-width: 640px) {
        width: 65px;
        height: 65px;
        font-size: 1.4rem;
    }

    @media (min-width: 1600px) {
        width: 100px;
        height: 100px;
        font-size: 2.2rem;
    }

    @media (min-width: 1920px) {
        width: 110px;
        height: 110px;
        font-size: 2.4rem;
    }
`;

export const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 900px) {
        gap: 1rem;
        width: 100%;
    }

    @media (max-width: 640px) {
        gap: 0.75rem;
    }
`;

export const Name = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #282a2f;
    margin: 0;

    @media (max-width: 900px) {
        font-size: 1.3rem;
    }

    @media (max-width: 640px) {
        font-size: 1.2rem;
    }

    @media (min-width: 1600px) {
        font-size: 1.8rem;
    }

    @media (min-width: 1920px) {
        font-size: 2rem;
    }
`;

export const StatsRow = styled.div`
    display: flex;
    gap: 120px;
    align-items: center;

    @media (max-width: 900px) {
        gap: 60px;
        justify-content: center;
    }

    @media (max-width: 640px) {
        gap: 40px;
    }

    @media (min-width: 1600px) {
        gap: 140px;
    }

    @media (min-width: 1920px) {
        gap: 160px;
    }
`;

export const StatBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const StatValue = styled.div<{ color?: string }>`
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ color }) => color || "#111827"};
    line-height: 1;
    margin-bottom: 0.3rem;

    @media (max-width: 900px) {
        font-size: 1.3rem;
    }

    @media (max-width: 640px) {
        font-size: 1.15rem;
    }

    @media (min-width: 1600px) {
        font-size: 1.8rem;
    }

    @media (min-width: 1920px) {
        font-size: 2rem;
    }
`;

export const StatLabel = styled.div`
    font-size: 0.875rem;
    color: #6b7280;

    @media (max-width: 640px) {
        font-size: 0.75rem;
    }

    @media (min-width: 1600px) {
        font-size: 1rem;
    }

    @media (min-width: 1920px) {
        font-size: 1.1rem;
    }
`;

export const Badges = styled.div`
    display: flex;
    gap: 25px;
    flex-wrap: wrap;

    @media (max-width: 900px) {
        justify-content: center;
        gap: 10px;
    }

    @media (max-width: 640px) {
        gap: 8px;
    }

    @media (min-width: 1600px) {
        gap: 28px;
    }

    @media (min-width: 1920px) {
        gap: 32px;
    }
`;

export const Badge = styled.span<{ $bg?: string }>`
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${({ $bg }) => $bg || "#f3f4f6"};
    color: #111827;
    padding: 6px 12px;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 10px;

    svg {
        width: 14px;
        height: 14px;
    }

    @media (max-width: 640px) {
        font-size: 0.7rem;
        padding: 5px 9px;

        svg {
            width: 12px;
            height: 12px;
        }
    }

    @media (min-width: 1600px) {
        font-size: 0.9rem;
        padding: 8px 14px;
    }

    @media (min-width: 1920px) {
        font-size: 1rem;
        padding: 10px 16px;
    }
`;

export const EditButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #d1d5db;
    background: #fff;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    height: fit-content;
    color: #454a51;
    align-self: flex-start;

    svg {
        width: 16px;
        height: 16px;
    }

    &:hover {
        background: #f9fafb;
        border-color: #9ca3af;
    }

    @media (max-width: 900px) {
        align-self: center;
        padding: 8px 16px;
        font-size: 0.85rem;
    }

    @media (max-width: 640px) {
        font-size: 0.8rem;
        padding: 7px 14px;
        width: 100%;
        justify-content: center;

        svg {
            width: 14px;
            height: 14px;
        }
    }

    @media (min-width: 1600px) {
        font-size: 1rem;
        padding: 12px 20px;
    }

    @media (min-width: 1920px) {
        font-size: 1.1rem;
        padding: 12px 24px;
    }
`;

type Props = {
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
};

export default function ProfileHeader({ isEditing, setIsEditing }: Props) {
    const { data: profileUser } = useProfile();
    const { data: userBookings = [] } = useMyBookings();
    const { data: allRides = [] } = useAllRides();

    if (!profileUser) return null;

    const userId = profileUser._id || profileUser.id;

    const initials = profileUser.username
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const ridesCreatedByUser = allRides.filter((ride) => {
        const driverId =
            typeof ride.driver === "string" ? ride.driver : ride.driver._id;
        return String(driverId) === String(userId);
    });

    let totalEcoSaved = 0;
    for (const ride of allRides) {
        const driverId =
            typeof ride.driver === "string" ? ride.driver : ride.driver._id;

        if (String(driverId) === String(userId)) {
            totalEcoSaved += ride.ecoImpact?.totalKg || 0;
        } else if (
            ride.passengers?.some(
                (passenger: any) =>
                    String(passenger._id ?? passenger) === String(userId)
            )
        ) {
            totalEcoSaved += ride.ecoImpact?.perPersonKg || 0;
        }
    }

    const totalRides = userBookings.length + ridesCreatedByUser.length;

    return (
        <Card>
            <LeftSection>
                <AvatarWrapper>
                    <Avatar>{initials}</Avatar>
                </AvatarWrapper>

                <InfoSection>
                    <Name>{profileUser.username}</Name>
                    <StatsRow>
                        <StatBox>
                            <StatValue color="#eacc43">{totalRides}</StatValue>
                            <StatLabel>Total Rides</StatLabel>
                        </StatBox>
                        <StatBox>
                            <StatValue color="#6cc3b7">
                                {totalEcoSaved.toFixed(1)}kg
                            </StatValue>
                            <StatLabel>CO₂ Saved</StatLabel>
                        </StatBox>
                    </StatsRow>
                    <Badges>
                        <Badge $bg="#e0e7ff">
                            <UserIcon />
                            Passenger
                        </Badge>
                        <Badge $bg="#dcfce7">
                            <Sprout />
                            Eco Warrior
                        </Badge>
                        {ridesCreatedByUser.length > 0 && (
                            <Badge $bg="#fee2e2">
                                <Car />
                                Driver
                            </Badge>
                        )}
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
