import styled from "styled-components";
import { Calendar, MapPin, Users } from "lucide-react";
import { useAllRides } from "../../hooks/useAllRides";
import type { Ride } from "../../types/ride";
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

const RideList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: 1600px) {
        gap: 20px;
    }

    @media (min-width: 1920px) {
        gap: 24px;
    }
`;

const Fallback = styled.div`
    text-align: center;
    padding: 3rem 1rem;
    color: #6b7280;
    font-size: 1rem;
    border: 1px dashed #d1d5db;
    border-radius: 12px;
    background: #f9fafb;
    transition: all 0.3s ease;

    @media (max-width: 640px) {
        font-size: 0.9rem;
        padding: 2rem 1rem;
    }

    @media (min-width: 1600px) {
        font-size: 1.1rem;
        padding: 3.5rem 2rem;
    }

    @media (min-width: 1920px) {
        font-size: 1.2rem;
        padding: 4rem 2.5rem;
    }
`;

const RideItem = styled.div`
    border-radius: 12px;
    padding: 16px;
    background: #fff;
    border: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0.5rem;
    padding-bottom: 1.5rem;
    flex-wrap: wrap;
    transition: all 0.25s ease;

    @media (max-width: 900px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.25rem;
        margin: 0.5rem 0;
        padding: 1.25rem;
    }

    @media (min-width: 1600px) {
        padding: 1.75rem;
    }

    @media (min-width: 1920px) {
        padding: 2rem;
    }
`;

const RideInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #50535a;

    @media (max-width: 640px) {
        font-size: 0.85rem;
    }

    @media (min-width: 1600px) {
        font-size: 0.95rem;
    }

    @media (min-width: 1920px) {
        font-size: 1rem;
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    flex-wrap: wrap;

    .active {
        margin: 0.6rem 0;
        color: #626d82;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .map {
        margin-bottom: 0.4rem;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    @media (max-width: 640px) {
        .map {
            font-size: 0.9rem;
        }
    }

    @media (min-width: 1600px) {
        .map {
            font-size: 1.05rem;
        }
    }

    @media (min-width: 1920px) {
        .map {
            font-size: 1.1rem;
        }
    }
`;

const RoleBadge = styled.span<{ type: "driver" | "passenger" }>`
    background: ${({ type }) => (type === "driver" ? "#e0f2fe" : "#fee2e2")};
    color: ${({ type }) => (type === "driver" ? "#0369a1" : "#991b1b")};
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    margin-right: 0.75rem;
    transition: all 0.3s ease;
`;

const RideActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    font-size: 0.9rem;

    @media (max-width: 900px) {
        width: 100%;
        align-items: flex-start;
        gap: 10px;
    }
`;

const Price = styled.span<{ positive?: boolean }>`
    font-weight: 600;
    color: ${({ positive }) => (positive ? "#39a798" : "#d76c6c")};
    font-size: 1.1rem;
    margin-top: 4rem;
    transition: font-size 0.3s ease;
`;

export default function RideHistory() {
    const { data: allRides = [] } = useAllRides();
    const { data: profileUser } = useProfile();

    if (!profileUser) return null;

    const userId = profileUser._id ?? profileUser?.id;

    const myRides = allRides?.filter(
        (ride: Ride) =>
            ride.driver._id === userId ||
            ride.passengers.some((passenger) => passenger._id === userId)
    );

    return (
        <Card>
            <Title>Recent Rides</Title>
            {myRides.length === 0 ? (
                <Fallback>
                    You haven’t taken or driven any rides yet.
                    <br />
                </Fallback>
            ) : (
                <RideList>
                    {myRides.map((ride) => {
                        const isDriver = ride.driver._id === userId;
                        const rideDate = new Date(
                            ride.departureDate
                        ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        });

                        const priceDisplay = isDriver
                            ? `+ $${ride.pricePerSeat * ride.passengers.length}`
                            : `- $${ride.pricePerSeat}`;

                        return (
                            <RideItem key={ride._id}>
                                <RideInfo>
                                    <Row>
                                        <div className="active">
                                            <RoleBadge
                                                type={
                                                    isDriver
                                                        ? "driver"
                                                        : "passenger"
                                                }
                                            >
                                                {isDriver
                                                    ? "Driver"
                                                    : "Passenger"}
                                            </RoleBadge>
                                            <Calendar size={18} />
                                            <span>{rideDate}</span>
                                        </div>
                                    </Row>
                                    <Row className="map">
                                        <MapPin size={20} color="#36a79a" />
                                        <span>
                                            {ride.from} → {ride.to}
                                        </span>
                                    </Row>
                                    <Row>
                                        <Users size={18} />
                                        <span>
                                            {isDriver ? (
                                                <>
                                                    Passengers:{" "}
                                                    {ride.passengers.length > 0
                                                        ? ride.passengers
                                                              .map(
                                                                  (p) =>
                                                                      p.username
                                                              )
                                                              .join(", ")
                                                        : "None"}
                                                </>
                                            ) : (
                                                <>
                                                    Driver:{" "}
                                                    {ride.driver.username}
                                                </>
                                            )}
                                        </span>
                                    </Row>
                                </RideInfo>
                                <RideActions>
                                    <Price positive={isDriver}>
                                        {priceDisplay}
                                    </Price>
                                </RideActions>
                            </RideItem>
                        );
                    })}
                </RideList>
            )}
        </Card>
    );
}
