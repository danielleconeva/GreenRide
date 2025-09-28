import styled from "styled-components";
import { Link } from "react-router-dom";
import type { Ride } from "../types/ride";
import {
    Calendar as CalendarIcon,
    Clock,
    Users,
    Music,
    Wind,
    Ban,
    PawPrint,
    Car,
} from "lucide-react";
import useDriver from "../hooks/useDriver";

const Card = styled(Link)`
    display: flex;
    gap: 24px;
    align-items: center;
    padding: 24px;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;
    text-decoration: none;
    color: inherit;
    transition: box-shadow 0.15s ease, transform 0.06s ease;

    &:hover {
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        transform: translateY(-1px);
    }
`;

const DriverCol = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 180px;

    .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #f2f7f6;
        color: #0f766e;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #d1faf5;
        font-size: 1rem;
    }
    .driverInfo {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .name {
        font-weight: 700;
        color: #111827;
        font-size: 1rem;
    }
    .rating {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #6b7280;
        font-size: 0.9rem;
    }
`;

const TimelineWrap = styled.div`
    flex: 1;
    min-width: 400px;
`;
const Timeline = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    .timeLocation {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .timeLocation.departure {
        align-items: flex-start;
    }
    .timeLocation.arrival {
        align-items: flex-end;
    }

    .time {
        font-size: 1.1rem;
        font-weight: 700;
        color: #111827;
    }
    .date {
        font-size: 0.85rem;
        color: #6b7280;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .location {
        font-size: 0.9rem;
        color: #374151;
        font-weight: 500;
    }

    .routeVisual {
        position: relative;
        flex: 1;
        margin: 0 16px;
        display: flex;
        align-items: center;
    }
    .routeLine {
        flex: 1;
        height: 2px;
        background: #d1d5db;
        position: relative;
    }
    .routeLine::before,
    .routeLine::after {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        background: #10b981;
        border-radius: 999px;
    }
    .routeLine::before {
        left: -4px;
    }
    .routeLine::after {
        right: -4px;
    }

    .duration {
        position: absolute;
        top: -24px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 6px;
        color: #6b7280;
        font-size: 0.9rem;
        background: #fff;
        padding: 4px 8px;
        border-radius: 8px;
        white-space: nowrap;
    }
`;

const VehicleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    color: #4b5563;
    font-size: 0.9rem;
    svg {
        width: 16px;
        height: 16px;
        color: #6b7280;
    }
`;

const Amenities = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
`;
const Chip = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: 12px;
    background: #f3f4f6;
    color: #4b5563;
    font-size: 0.8rem;
    svg {
        width: 12px;
        height: 12px;
        color: #6b7280;
    }
`;

const Note = styled.div`
    color: #6b7280;
    font-style: italic;
    padding-top: 10px;
`;

const RightCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-width: 160px;

    .price {
        color: #14b8a6;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        .currency {
            font-size: 1.2rem;
        }
        small {
            color: #6b7280;
            font-weight: 600;
            font-size: 0.8rem;
            display: block;
            margin-top: 0.35rem;
        }
    }

    .seats {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 20px;
        background: #f2f7f6;
        color: #0f6f69;
        font-weight: 600;
        font-size: 0.85rem;
        border: 1px solid #d1fae5;
        svg {
            width: 14px;
            height: 14px;
            color: #14b8a6;
        }
    }

    .cta {
        width: 140px;
        height: 40px;
        border-radius: 20px;
        border: 0;
        background: #14b8a6;
        color: #fff;
        font-weight: 800;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.15s ease;
        &:hover {
            background: #0f766e;
        }
    }
`;

type Props = { ride: Ride };

export default function RideCard({ ride }: Props) {
    const dateStr = ride.departureDate
        ? new Date(ride.departureDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
          })
        : "";

    const h = Math.floor(ride.durationMin / 60);
    const m = ride.durationMin % 60;
    const totalSeats = ride.seatsAvailable + (ride.passengers?.length ?? 0);

    const driverId = ride.driver?._id;
    const { data: driverPub } = useDriver(driverId);

    const displayName = driverPub?.username ?? ride.driver.username;
    const tripsCompleted = driverPub?.tripsCompleted;

    const driverInitials = displayName
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const carFromHook = driverPub?.car;
    const carFromRide = (ride as any)?.driver?.car;
    const car = carFromHook ?? carFromRide ?? null;

    const vehicle = car
        ? `${car.make ?? ""} ${car.model ?? ""}`.trim() +
          (car.year ? ` (${car.year})` : "")
        : "";

    return (
        <Card to={`/rides/${ride._id}`}>
            <DriverCol>
                <div className="avatar">{driverInitials || "D"}</div>
                <div className="driverInfo">
                    <div className="name">{displayName}</div>

                    <div className="rating">
                        {typeof tripsCompleted === "number"
                            ? `${tripsCompleted} trips`
                            : null}
                    </div>
                </div>
            </DriverCol>

            <TimelineWrap>
                <Timeline>
                    <div className="timeLocation departure">
                        <div className="time">{ride.departureTime}</div>
                        <div className="date">
                            <CalendarIcon size={12} /> {dateStr}
                        </div>
                        <div className="location">{ride.from}</div>
                    </div>

                    <div className="routeVisual">
                        <div className="routeLine" />
                        <div className="duration">
                            <Clock size={14} /> {h}h {m}m
                        </div>
                    </div>

                    <div className="timeLocation arrival">
                        <div className="time">{ride.arrivalTime}</div>
                        <div className="date">
                            <CalendarIcon size={12} /> {dateStr}
                        </div>
                        <div className="location">{ride.to}</div>
                    </div>
                </Timeline>

                <VehicleRow>
                    <Car />
                    <span>{vehicle || "Vehicle"}</span>
                </VehicleRow>

                <Amenities>
                    {ride.amenities.airConditioning && (
                        <Chip>
                            <Wind /> A/C
                        </Chip>
                    )}
                    {ride.amenities.music && (
                        <Chip>
                            <Music /> Music
                        </Chip>
                    )}
                    {ride.amenities.smokingAllowed && (
                        <Chip>
                            <Ban /> Smoking
                        </Chip>
                    )}
                    {ride.amenities.petsAllowed && (
                        <Chip>
                            <PawPrint /> Pets
                        </Chip>
                    )}
                </Amenities>

                {ride.notes && <Note>“{ride.notes}”</Note>}
            </TimelineWrap>

            <RightCol>
                <div className="price">
                    <span className="currency">€ </span>
                    {ride.pricePerSeat.toFixed(0)}
                    <small>per person</small>
                </div>
                <div className="seats">
                    <Users /> {ride.seatsAvailable} of {totalSeats} left
                </div>
                <button className="cta" type="button">
                    Book Now
                </button>
            </RightCol>
        </Card>
    );
}
