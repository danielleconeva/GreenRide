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
`;

const Title = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: #353333;
    margin-bottom: 1.5rem;
`;

const RideList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
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
`;

const RideInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #50535a;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;

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
`;

const RoleBadge = styled.span<{ type: "driver" | "passenger" }>`
    background: ${({ type }) => (type === "driver" ? "#e0f2fe" : "#fee2e2")};
    color: ${({ type }) => (type === "driver" ? "#0369a1" : "#991b1b")};
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    margin-right: 0.75rem;
`;

const RideActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    font-size: 0.9rem;
`;

const Price = styled.span<{ positive?: boolean }>`
    font-weight: 600;
    color: ${({ positive }) => (positive ? "#39a798" : "#d76c6c")};
    font-size: 1.1rem;
    margin: 4rem 0 0.5rem 0;
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
                                            {isDriver ? "Driver" : "Passenger"}
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
                                                              (p) => p.username
                                                          )
                                                          .join(", ")
                                                    : "None"}
                                            </>
                                        ) : (
                                            <>Driver: {ride.driver.username}</>
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
        </Card>
    );
}
