import styled from "styled-components";
import { Calendar, MapPin, Users, Edit, Trash2 } from "lucide-react";

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    font-family: ${({ theme }) => theme.fonts.body};
    background: #fff;
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
    gap: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #50535a;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    .active {
        margin: 0.6rem 0;
        color: #626d82;
    }
    .map {
        margin-bottom: 0.4rem;
        font-size: 1rem;
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
`;

const RideActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    font-size: 0.9rem;
`;

const Price = styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
    margin: 2rem 0 0.5rem 0;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 10px;
`;

const ActionBtn = styled.button`
    border: 1px solid #d1d5db;
    border-radius: 10px;
    padding: 0.5rem;
    background: #fff;
    cursor: pointer;
    color: #867676;

    svg {
        width: 16px;
        height: 16px;
        font-size: 2rem;
    }

    &:hover {
        background: #f9fafb;
    }
`;

export default function MyRides() {
    return (
        <Card>
            <Title>Manage Your Published Rides</Title>
            <RideList>
                <RideItem>
                    <RideInfo>
                        <Row>
                            <div className="active">
                                <Status>Active</Status>
                                <Calendar size={16} />
                                <span> 2024-03-25 at 14:30</span>
                            </div>
                        </Row>
                        <Row>
                            <div className="map">
                                <MapPin size={18} color="#36a79a" />{" "}
                                <span>University → Shopping Center</span>
                            </div>
                        </Row>
                        <Row className="seats">
                            <Users size={16} />{" "}
                            <span>3 of 4 seats available</span>
                        </Row>
                    </RideInfo>
                    <RideActions>
                        <ActionButtons>
                            <ActionBtn>
                                <Edit />
                            </ActionBtn>
                            <ActionBtn>
                                <Trash2 />
                            </ActionBtn>
                        </ActionButtons>
                        <Price>$30/person</Price>
                    </RideActions>
                </RideItem>
            </RideList>
        </Card>
    );
}
