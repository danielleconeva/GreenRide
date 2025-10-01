import styled from "styled-components";

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: 640px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
`;

const Details = styled.div``;

const Name = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
`;

const Stats = styled.div`
    margin-top: 6px;
    display: flex;
    gap: 20px;
    font-size: 0.875rem;
    color: #374151;
`;

const Badges = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

const Badge = styled.span<{ color: string }>`
    background: ${({ color }) => color || "#f3f4f6"};
    color: #111827;
    padding: 4px 12px;
    font-size: 0.75rem;
    font-weight: 500;
    border-radius: 999px;
`;

const EditButton = styled.button`
    border: 1px solid #d1d5db;
    background: #fff;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
        background: #f9fafb;
    }
`;

export default function ProfileHeader() {
    return (
        <Card>
            <UserInfo>
                <Avatar src="https://via.placeholder.com/96" alt="Profile" />
                <Details>
                    <Name>John Doe</Name>
                    <Stats>
                        <span>
                            <strong>24</strong> Total Rides
                        </span>
                        <span>
                            <strong>156kg</strong> CO₂ Saved
                        </span>
                    </Stats>
                    <Badges>
                        <Badge color="#dcfce7">Eco Warrior</Badge>
                        <Badge color="#dbeafe">Driver</Badge>
                        <Badge color="#f3f4f6">Verified</Badge>
                    </Badges>
                </Details>
            </UserInfo>
            <EditButton>Edit Profile</EditButton>
        </Card>
    );
}
