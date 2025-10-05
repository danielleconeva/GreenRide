import styled from "styled-components";
import { Calendar, MapPin, Users, Edit, Trash2 } from "lucide-react";
import { useMyRides } from "../../hooks/useMyRides";
import { useNavigate } from "react-router-dom";
import useRide from "../../hooks/useRide";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal";

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
    gap: 8px;
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
    gap: 8px;
    flex-wrap: wrap;

    .active {
        margin: 0.6rem 0;
        color: #626d82;
    }

    .map {
        margin-bottom: 0.4rem;
        font-size: 1rem;
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

const Status = styled.span`
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.3rem 0.9rem;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    margin-right: 1rem;

    @media (max-width: 640px) {
        font-size: 0.8rem;
        padding: 0.25rem 0.7rem;
    }

    @media (min-width: 1600px) {
        font-size: 1rem;
    }

    @media (min-width: 1920px) {
        font-size: 1.1rem;
        padding: 0.4rem 1rem;
    }
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

    @media (min-width: 1600px) {
        gap: 14px;
    }

    @media (min-width: 1920px) {
        gap: 16px;
    }
`;

const Price = styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
    margin: 2rem 0 0.5rem 0;

    @media (max-width: 900px) {
        margin: 0;
        font-size: 0.95rem;
    }

    @media (max-width: 640px) {
        font-size: 0.9rem;
    }

    @media (min-width: 1600px) {
        font-size: 1.1rem;
    }

    @media (min-width: 1920px) {
        font-size: 1.2rem;
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 10px;

    @media (max-width: 640px) {
        gap: 8px;
    }

    @media (min-width: 1600px) {
        gap: 12px;
    }

    @media (min-width: 1920px) {
        gap: 14px;
    }
`;

const ActionBtn = styled.button`
    border: 1px solid #d1d5db;
    border-radius: 10px;
    padding: 0.5rem;
    background: #fff;
    cursor: pointer;
    color: #867676;
    transition: all 0.2s ease;

    svg {
        width: 16px;
        height: 16px;
    }

    &:hover {
        background: #f9fafb;
        transform: scale(1.05);
    }

    @media (max-width: 640px) {
        padding: 0.45rem;
        svg {
            width: 14px;
            height: 14px;
        }
    }

    @media (min-width: 1600px) {
        padding: 0.6rem;
        svg {
            width: 18px;
            height: 18px;
        }
    }

    @media (min-width: 1920px) {
        padding: 0.75rem;
        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

export default function MyRides() {
    const { data: rides = [], isLoading } = useMyRides();
    const navigate = useNavigate();
    const { deleteRide } = useRide();
    const [rideToDelete, setRideToDelete] = useState<string | null>(null);

    if (isLoading) {
        return (
            <Card>
                <p>Loading your rides...</p>
            </Card>
        );
    }

    return (
        <Card>
            <Title>Manage Your Published Rides</Title>
            <RideList>
                {rides.length === 0 && <p>No rides published yet.</p>}
                {rides.map((ride) => {
                    const seatsText =
                        ride.seatsAvailable === 1
                            ? "1 seat available"
                            : `${ride.seatsAvailable} seats available`;

                    return (
                        <RideItem key={ride._id}>
                            <RideInfo>
                                <Row>
                                    <div className="active">
                                        <Status>Active</Status>
                                        <Calendar size={16} />
                                        <span>
                                            {new Date(
                                                ride.departureDate
                                            ).toLocaleDateString()}{" "}
                                            at {ride.departureTime}
                                        </span>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="map">
                                        <MapPin size={18} color="#36a79a" />{" "}
                                        <span>
                                            {ride.from} → {ride.to}
                                        </span>
                                    </div>
                                </Row>
                                <Row className="seats">
                                    <Users size={16} /> <span>{seatsText}</span>
                                </Row>
                            </RideInfo>

                            <RideActions>
                                <ActionButtons>
                                    <ActionBtn
                                        onClick={() =>
                                            navigate(`/rides/${ride._id}/edit`)
                                        }
                                    >
                                        <Edit />
                                    </ActionBtn>
                                    <ActionBtn
                                        onClick={() =>
                                            setRideToDelete(ride._id)
                                        }
                                    >
                                        <Trash2 />
                                    </ActionBtn>
                                </ActionButtons>
                                <Price>€{ride.pricePerSeat}/per person</Price>
                            </RideActions>
                        </RideItem>
                    );
                })}
            </RideList>

            {rideToDelete && (
                <ConfirmModal
                    onConfirm={() => {
                        deleteRide(rideToDelete);
                        setRideToDelete(null);
                    }}
                    onCancel={() => setRideToDelete(null)}
                />
            )}
        </Card>
    );
}
