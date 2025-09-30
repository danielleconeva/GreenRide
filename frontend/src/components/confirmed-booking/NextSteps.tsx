import styled from "styled-components";

const Wrapper = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    padding: 20px;
`;
const Title = styled.h3`
    margin: 0 0 24px;
    font-size: 1.375rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.3;
`;

const List = styled.ol`
    margin: 0;
    padding-left: 0;
    list-style: none;
    display: grid;
    gap: 14px;
`;

const Item = styled.li`
    display: grid;
    grid-template-columns: 35px 1fr;
    gap: 10px;
    align-items: start;
`;

const Bubble = styled.span`
    width: 33px;
    height: 33px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: #ebfbfb;
    color: #228d91;
    font-weight: 600;
    font-size: 0.9rem;
`;

const Line = styled.div`
    color: #36393d;
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const Sub = styled.div`
    color: #64748b;
    margin-bottom: 0.5rem;
`;

export default function NextSteps() {
    return (
        <Wrapper>
            <Title>What's Next?</Title>
            <List>
                <Item>
                    <Bubble>1</Bubble>
                    <div>
                        <Line>Contact your driver</Line>
                        <Sub>
                            Confirm meeting point and any last-minute details
                            before departure
                        </Sub>
                    </div>
                </Item>
                <Item>
                    <Bubble>2</Bubble>
                    <div>
                        <Line>Be ready on time</Line>
                        <Sub>
                            Arrive at the meeting point 5–10 minutes before
                            departure time
                        </Sub>
                    </div>
                </Item>
                <Item>
                    <Bubble>3</Bubble>
                    <div>
                        <Line>Enjoy your eco-friendly ride</Line>
                        <Sub>
                            Relax and enjoy the journey while contributing to a
                            greener planet
                        </Sub>
                    </div>
                </Item>
            </List>
        </Wrapper>
    );
}
