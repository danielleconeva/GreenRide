import styled from "styled-components";
import { User } from "lucide-react";
import type { Ride } from "../../types/ride";

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 25px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Row = styled.div`
    display: grid;
    gap: 8px;
`;

const Driver = styled.div`
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 18px;
    align-items: center;

    .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #f2f7f6;
        color: #0f766e;
        font-weight: 700;
        display: grid;
        place-items: center;
        border: 1px solid #cbd9d7;
    }

    .name {
        font-weight: 600;
        color: #1f2937;
        font-size: 1rem;
    }

    .sub {
        color: #6b7280;
        font-size: 0.85rem;
        font-weight: 600;
        margin-top: 0.3rem;
    }
`;

const VehicleInfo = styled.div`
    color: #1f2937;
    font-weight: 500;
    font-size: 0.95rem;
    margin-top: 0.8rem;
    margin-bottom: 0.4rem;
`;

const AmenitiesRow = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 0.5rem;
`;

const Pill = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    background: #f3f4f6;
    color: #4b5563;
    font-size: 0.8rem;
`;

type Props = { ride: Ride };

export default function DriverInformation({ ride }: Props) {
    const name = ride.driver?.username || "Driver";
    const initials = name
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const car = (ride as any)?.driver?.car ?? null;
    const vehicle = car
        ? `${car.make ?? ""} ${car.model ?? ""}`.trim() +
          (car.year ? ` • ${car.year}` : "")
        : "Vehicle";

    return (
        <Card aria-labelledby="driver-title">
            <Title id="driver-title">
                <User size={22} />
                Driver Information
            </Title>
            <Row>
                <Driver>
                    <div className="avatar">{initials || "D"}</div>
                    <div>
                        <div className="name">{name}</div>
                        <div className="sub">Experienced driver</div>
                    </div>
                </Driver>
                <VehicleInfo>
                    {vehicle}
                    {car?.license ? ` • License: ${car.license}` : ""}
                </VehicleInfo>
                <AmenitiesRow>
                    {ride.amenities?.airConditioning && (
                        <Pill>Air Conditioning</Pill>
                    )}
                    {ride.amenities?.music && <Pill>Music</Pill>}
                    {ride.amenities?.smokingAllowed && <Pill>Smoking</Pill>}
                    {ride.amenities?.petsAllowed && <Pill>Pets</Pill>}
                </AmenitiesRow>
            </Row>
        </Card>
    );
}
