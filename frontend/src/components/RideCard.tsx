import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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

const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 24px;
    padding: 24px;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;
    transition: box-shadow 0.15s ease, transform 0.06s ease;

    &:hover {
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        transform: translateY(-1px);
    }

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: stretch;
        flex-wrap: nowrap;
        gap: 16px;
        padding: 16px;
    }

    @media (min-width: 1600px) {
        gap: 28px;
        padding: 28px;
    }

    @media (min-width: 1920px) {
        gap: 32px;
        padding: 32px;
        border-radius: 20px;
    }
`;

const DriverCol = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 140px;

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

    @media (max-width: 900px) {
        min-width: 0;
        .avatar {
            width: 44px;
            height: 44px;
            font-size: 0.95rem;
        }
        .name {
            font-size: 0.95rem;
        }
        .rating {
            font-size: 0.85rem;
        }
    }

    @media (min-width: 1600px) {
        min-width: 160px;
        .avatar {
            width: 56px;
            height: 56px;
            font-size: 1.05rem;
        }
        .name {
            font-size: 1.05rem;
        }
    }

    @media (min-width: 1920px) {
        min-width: 180px;
        .name {
            font-size: 1.1rem;
        }
    }
`;

const TimelineWrap = styled.div`
    flex: 1;
    min-width: 0;
    width: 100%;
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
        margin-bottom: 0.4rem;
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
        justify-content: center;
        height: 32px;
    }
    .routeLine {
        width: 100%;
        height: 2px;
        background: #d1d5db;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
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
        bottom: -22px;
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

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;

        .timeLocation.departure,
        .timeLocation.arrival {
            align-items: flex-start;
        }

        .routeVisual {
            order: 2;
            margin: 12px 0;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        .duration {
            position: relative;
            bottom: auto;
            top: 6px;
            left: 0;
            transform: none;
            align-self: center;
        }
    }

    @media (min-width: 1600px) {
        gap: 28px;
        .time {
            font-size: 1.2rem;
        }
        .date {
            font-size: 0.95rem;
        }
        .location {
            font-size: 1rem;
        }
    }

    @media (min-width: 1920px) {
        gap: 32px;
        .time {
            font-size: 1.25rem;
        }
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

    @media (min-width: 1600px) {
        font-size: 1rem;
        gap: 10px;
    }

    @media (min-width: 1920px) {
        font-size: 1.05rem;
    }
`;

const Amenities = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;

    @media (max-width: 640px) {
        gap: 6px;
        margin-top: 6px;
    }

    @media (min-width: 1600px) {
        gap: 10px;
    }
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

    @media (min-width: 1600px) {
        font-size: 0.85rem;
        padding: 5px 9px;
    }

    @media (min-width: 1920px) {
        font-size: 0.9rem;
        padding: 6px 10px;
    }
`;

const Note = styled.div`
    color: #6b7280;
    font-style: italic;
    padding-top: 10px;

    @media (max-width: 640px) {
        padding-top: 8px;
    }

    @media (min-width: 1600px) {
        font-size: 1rem;
    }
`;

const RightCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-width: 0;
    width: 100%;

    .price {
        color: #14b8a6;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        text-align: center;

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
        width: 100%;
        height: 44px;
        border-radius: 12px;
        border: 0;
        background: #14b8a6;
        color: #fff;
        font-weight: 800;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.15s ease;
        &:hover {
            background: #0f766e;
        }
    }

    @media (max-width: 640px) {
        .cta {
            width: 130px;
            height: 36px;
            border-radius: 8px;
            font-size: 0.85rem;
            align-self: center;
        }
    }

    @media (min-width: 1600px) {
        min-width: 200px;
        width: auto;
        .price {
            font-size: 1.7rem;
            .currency {
                font-size: 1.25rem;
            }
        }
        .cta {
            width: 160px;
            height: 44px;
            font-size: 0.95rem;
        }
    }

    @media (min-width: 1920px) {
        min-width: 220px;
        .price {
            font-size: 1.85rem;
            .currency {
                font-size: 1.35rem;
            }
            small {
                font-size: 0.85rem;
            }
        }
        .seats {
            font-size: 0.9rem;
            padding: 8px 14px;
        }
        .cta {
            width: 180px;
            height: 48px;
            font-size: 1rem;
        }
    }
`;

type Props = { ride: Ride };

export default function RideCard({ ride }: Props) {
    const navigate = useNavigate();
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
    const handleBookClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/booking/${ride._id}`, { state: { ride } });
    };

    return (
        <Card>
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
                <button
                    className="cta"
                    type="button"
                    onClick={handleBookClick}
                    aria-label={`Book ride from ${ride.from} to ${ride.to}`}
                >
                    Book Now
                </button>
            </RightCol>
        </Card>
    );
}
