import styled from "styled-components";
import { Calendar, MapPin, Users } from "lucide-react";

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
    background: ${({ type }) => (type === "driver" ? "#fee2e2" : "#e0f2fe")};
    color: ${({ type }) => (type === "driver" ? "#991b1b" : "#0369a1")};
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
    font-weight: 500;
    color: ${({ positive, theme }) =>
        positive ? theme.colors.primary : "#374151"};
    font-size: 1.1rem;
    margin: 4rem 0 0.5rem 0;
`;

export default function RideHistory() {
    return (
        <Card>
            <Title>Recent Rides</Title>
            <RideList>
                <RideItem>
                    <RideInfo>
                        <Row>
                            <div className="active">
                                <RoleBadge type="passenger">
                                    Passenger
                                </RoleBadge>
                                <Calendar size={18} />
                                <span>2024-03-20</span>
                            </div>
                        </Row>
                        <Row className="map">
                            <MapPin size={20} color="#36a79a" />
                            <span>Downtown → Airport</span>
                        </Row>
                        <Row>
                            <Users size={18} />
                            <span>Driver: Sarah Johnson</span>
                        </Row>
                    </RideInfo>
                    <RideActions>
                        <Price>$25</Price>
                    </RideActions>
                </RideItem>

                <RideItem>
                    <RideInfo>
                        <Row>
                            <div className="active">
                                <RoleBadge type="driver">Driver</RoleBadge>
                                <Calendar size={18} />
                                <span>2024-03-18</span>
                            </div>
                        </Row>
                        <Row className="map">
                            <MapPin size={20} color="#36a79a" />
                            <span>University → Mall</span>
                        </Row>
                        <Row>
                            <Users size={18} />
                            <span>Passengers: Mike Chen, Emma Wilson</span>
                        </Row>
                    </RideInfo>
                    <RideActions>
                        <Price positive>+$45</Price>
                    </RideActions>
                </RideItem>

                <RideItem>
                    <RideInfo>
                        <Row>
                            <div className="active">
                                <RoleBadge type="passenger">
                                    Passenger
                                </RoleBadge>
                                <Calendar size={18} />
                                <span>2024-03-15</span>
                            </div>
                        </Row>
                        <Row className="map">
                            <MapPin size={20} color="#36a79a" />
                            <span>Office District → Home</span>
                        </Row>
                        <Row>
                            <Users size={18} />
                            <span>Driver: David Kim</span>
                        </Row>
                    </RideInfo>
                    <RideActions>
                        <Price>$18</Price>
                    </RideActions>
                </RideItem>
            </RideList>
        </Card>
    );
}
