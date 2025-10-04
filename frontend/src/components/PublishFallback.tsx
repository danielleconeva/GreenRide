import styled, { keyframes } from "styled-components";
import { Users, Car, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeScale = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const Page = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    font-family: ${({ theme }) => theme.fonts.body};
    min-height: 100vh;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 800;
    margin: 1.2rem 0 2rem;
    color: ${({ theme }) => theme.colors.foreground};
    opacity: 0;
    animation: ${fadeUp} 0.7s ease forwards;
    animation-delay: 0.15s;

    span {
        color: #14b8a6;
    }
`;

const Subtitle = styled.p`
    max-width: 700px;
    margin: 0.6rem auto 2rem;
    font-size: 1.1rem;
    color: #6b7280;
    line-height: 1.6;
    opacity: 0;
    animation: ${fadeUp} 0.7s ease forwards;
    animation-delay: 0.3s;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 2rem auto 3rem;
    opacity: 0;
    animation: ${fadeUp} 0.7s ease forwards;
    animation-delay: 0.4s;
`;

const PrimaryBtn = styled.button`
    padding: 1rem 2rem;
    font-size: 1.05rem;
    border-radius: 14px;
    border: none;
    font-weight: 600;
    color: #fff;
    background: ${({ theme }) => theme.colors.gradientHero};
    cursor: pointer;
    transition: all 0.25s ease;
    width: fit-content;
    min-width: 200px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
    }
`;

const SecondaryBtn = styled.button`
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    font-weight: 600;
    background: #fff;
    cursor: pointer;
    transition: all 0.25s ease;
    width: fit-content;
    min-width: 200px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
    }
`;

const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
    opacity: 0;
    animation: ${fadeScale} 0.7s ease forwards;
    animation-delay: 0.5s;
`;

const FeatureCard = styled.div`
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;
    padding: 2rem 1.5rem;
    text-align: center;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }

    .icon {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: #ecfdf5;
        color: #14b8a6;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
    }

    h3 {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: #111827;
    }

    p {
        font-size: 0.95rem;
        color: #6b7280;
        line-height: 1.4;
    }
`;

/* 🔹 Bottom "How Publishing Works" Section */
const TrackSection = styled.section`
    max-width: 900px;
    margin: 4rem auto 0;
    padding: 2rem;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;
    text-align: center;
    opacity: 0;
    animation: ${fadeUp} 0.7s ease forwards;
    animation-delay: 0.6s;

    h2 {
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    > p {
        color: #6b7280;
        margin-bottom: 2rem;
    }
`;

const TrackGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
`;

const TrackItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    text-align: left;

    .icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ecfdf5;
        color: #14b8a6;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
    }

    .text {
        display: flex;
        flex-direction: column;
    }

    h4 {
        font-size: 1.05rem;
        font-weight: 600;
        margin: 0 0 0.3rem;
        color: #111827;
    }

    p {
        font-size: 0.9rem;
        margin: 0;
        color: #6b7280;
    }
`;

export default function PublishFallback() {
    const navigate = useNavigate();

    return (
        <Page>
            <Title>
                Share Your Journey, <span>Make a Difference</span>
            </Title>
            <Subtitle>
                Turn your empty seats into opportunities. Help fellow travelers,
                reduce your costs, and contribute to a greener planet—all in one
                trip.
            </Subtitle>

            <ButtonRow>
                <PrimaryBtn onClick={() => navigate("/login")}>
                    Log In to Publish →
                </PrimaryBtn>
                <SecondaryBtn onClick={() => navigate("/register")}>
                    Create Account
                </SecondaryBtn>
            </ButtonRow>

            <FeaturesGrid>
                <FeatureCard>
                    <div className="icon">
                        <Leaf size={24} />
                    </div>
                    <h3>Help the Environment</h3>
                    <p>
                        Every shared ride reduces CO₂ emissions and helps build
                        a sustainable future.
                    </p>
                </FeatureCard>
                <FeatureCard>
                    <div className="icon">
                        <Users size={24} />
                    </div>
                    <h3>Connect with People</h3>
                    <p>
                        Meet interesting travelers and build a community while
                        on the road.
                    </p>
                </FeatureCard>
                <FeatureCard>
                    <div className="icon">
                        <Car size={24} />
                    </div>
                    <h3>Save Money</h3>
                    <p>
                        Offset your fuel costs by sharing rides with fellow
                        passengers.
                    </p>
                </FeatureCard>
            </FeaturesGrid>

            <TrackSection>
                <h2>How Publishing Works</h2>
                <p>Share your ride in just a few simple steps</p>
                <TrackGrid>
                    <TrackItem>
                        <div className="icon">1</div>
                        <div className="text">
                            <h4>Set Your Route</h4>
                            <p>
                                Enter your starting point and destination to let
                                passengers find your ride.
                            </p>
                        </div>
                    </TrackItem>
                    <TrackItem>
                        <div className="icon">2</div>
                        <div className="text">
                            <h4>Pick Date & Time</h4>
                            <p>
                                Choose when you're planning to depart so
                                passengers can plan accordingly.
                            </p>
                        </div>
                    </TrackItem>
                    <TrackItem>
                        <div className="icon">3</div>
                        <div className="text">
                            <h4>Set Available Seats</h4>
                            <p>
                                Decide how many passengers you can take and set
                                a fair price.
                            </p>
                        </div>
                    </TrackItem>
                    <TrackItem>
                        <div className="icon">4</div>
                        <div className="text">
                            <h4>Add Car Details</h4>
                            <p>
                                Share your car info and preferences so
                                passengers know what to expect.
                            </p>
                        </div>
                    </TrackItem>
                </TrackGrid>
            </TrackSection>
        </Page>
    );
}
