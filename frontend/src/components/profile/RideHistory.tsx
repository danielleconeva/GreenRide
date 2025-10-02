import styled from "styled-components";
import { Calendar, MapPin, Users, Star } from "lucide-react";

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
`;

const RideInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #50535a;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    .map {
        margin-bottom: 0.2rem;
    }
`;

const RoleBadge = styled.span<{ type: "driver" | "passenger" }>`
    background: ${({ type }) => (type === "driver" ? "#fee2e2" : "#e0f2fe")};
    color: ${({ type }) => (type === "driver" ? "#991b1b" : "#0369a1")};
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.2rem 0.7rem;
    border-radius: 10px;
`;

const RideActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    font-size: 0.9rem;
`;

const Price = styled.span<{ positive?: boolean }>`
    font-weight: 600;
    color: ${({ positive, theme }) =>
        positive ? theme.colors.primary : "#374151"};
    font-size: 1rem;
`;

const Rating = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    color: #f59e0b;
    font-weight: 600;
`;

export default function RideHistory() {
    return (
        <Card>
            <Title>Recent Rides</Title>
            <RideList>
                {/* Passenger Example */}
                <RideItem>
                    <RideInfo>
                        <Row>
                            <RoleBadge type="passenger">Passenger</RoleBadge>
                            <Calendar size={16} />
                            <span>2024-03-20</span>
                        </Row>
                        <Row className="map">
                            <MapPin size={16} color="#36a79a" />
                            <span>Downtown → Airport</span>
                        </Row>
                        <Row>
                            <Users size={16} />
                            <span>Driver: Sarah Johnson</span>
                        </Row>
                    </RideInfo>
                    <RideActions>
                        <Rating>
                            <Star size={16} /> 5
                        </Rating>
                        <Price>$25</Price>
                    </RideActions>
                </RideItem>

                {/* Driver Example */}
                <RideItem>
                    <RideInfo>
                        <Row>
                            <RoleBadge type="driver">Driver</RoleBadge>
                            <Calendar size={16} />
                            <span>2024-03-18</span>
                        </Row>
                        <Row className="map">
                            <MapPin size={16} color="#36a79a" />
                            <span>University → Mall</span>
                        </Row>
                        <Row>
                            <Users size={16} />
                            <span>Passengers: Mike Chen, Emma Wilson</span>
                        </Row>
                    </RideInfo>
                    <RideActions>
                        <Rating>
                            <Star size={16} /> 4.8
                        </Rating>
                        <Price positive>+$45</Price>
                    </RideActions>
                </RideItem>

                {/* Another Passenger Example */}
                <RideItem>
                    <RideInfo>
                        <Row>
                            <RoleBadge type="passenger">Passenger</RoleBadge>
                            <Calendar size={16} />
                            <span>2024-03-15</span>
                        </Row>
                        <Row className="map">
                            <MapPin size={16} color="#36a79a" />
                            <span>Office District → Home</span>
                        </Row>
                        <Row>
                            <Users size={16} />
                            <span>Driver: David Kim</span>
                        </Row>
                    </RideInfo>
                    <RideActions>
                        <Rating>
                            <Star size={16} /> 4.5
                        </Rating>
                        <Price>$18</Price>
                    </RideActions>
                </RideItem>
            </RideList>
        </Card>
    );
}
