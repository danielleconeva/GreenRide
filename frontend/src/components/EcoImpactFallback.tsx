import styled, { keyframes } from "styled-components";
import { Leaf, Award, Zap, Sprout } from "lucide-react";
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
    margin: 1.2rem 0 2.5rem;
    color: ${({ theme }) => theme.colors.foreground};
    opacity: 0;
    animation: ${fadeUp} 0.7s ease forwards;
    animation-delay: 0.15s;

    span {
        color: #14b8a6;
    }
`;

const Subtitle = styled.p`
    max-width: 650px;
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
    margin: 2.5rem auto;
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
    margin-top: 3rem;
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
        transition: background 0.3s ease, color 0.3s ease;
    }

    &:hover .icon {
        background: #14b8a6;
        color: #fff;
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

const TrackSection = styled.section`
    max-width: 800px;
    margin: 0 auto;
    margin-top: 4rem;
    padding: 2rem;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;

    opacity: 0;
    animation: ${fadeUp} 0.7s ease forwards;
    animation-delay: 0.6s;

    h2 {
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 1rem;
        text-align: center;
    }

    > p {
        text-align: center;
        color: #6b7280;
        margin-bottom: 2rem;
    }
`;

const TrackGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 700px;
    margin: 0 auto;
    align-items: stretch;
`;
const TrackItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    .icon {
        flex-shrink: 0;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: #ecfdf5;
        color: #14b8a6;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2px;
    }

    .text {
        display: flex;
        flex-direction: column;
    }

    h4 {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 0.25rem;
        color: #111827;
        line-height: 1.2;
        text-align: start;
    }

    p {
        font-size: 0.9rem;
        margin: 0;
        color: #6b7280;
        line-height: 1.4;
    }
`;

export default function EcoImpactFallback() {
    const navigate = useNavigate();

    return (
        <Page>
            <Title>
                See Your <span>Environmental Impact</span>
            </Title>
            <Subtitle>
                Every ride you share makes a difference. Track your CO₂ savings,
                unlock achievements and watch your positive impact grow with
                every journey.
            </Subtitle>

            <ButtonRow>
                <PrimaryBtn onClick={() => navigate("/login")}>
                    Log In to View Your Stats →
                </PrimaryBtn>
                <SecondaryBtn onClick={() => navigate("/register")}>
                    Create Account
                </SecondaryBtn>
            </ButtonRow>

            <FeaturesGrid>
                <FeatureCard>
                    <div className="icon">
                        <Zap size={24} />
                    </div>
                    <h3>Track Your Progress</h3>
                    <p>
                        Monitor your monthly CO₂ savings with beautiful charts
                        and see your impact grow over time.
                    </p>
                </FeatureCard>
                <FeatureCard>
                    <div className="icon">
                        <Award size={24} />
                    </div>
                    <h3>Unlock Achievements</h3>
                    <p>
                        Earn badges and level up as you contribute to a greener
                        planet with every shared ride.
                    </p>
                </FeatureCard>
                <FeatureCard>
                    <div className="icon">
                        <Leaf size={24} />
                    </div>
                    <h3>See Real Impact</h3>
                    <p>
                        Visualize your savings as trees planted, car miles
                        avoided, and energy saved.
                    </p>
                </FeatureCard>
            </FeaturesGrid>

            <TrackSection>
                <h2>What You’ll Track</h2>
                <p>Your personalized eco dashboard includes:</p>
                <TrackGrid>
                    <TrackItem>
                        <div className="icon">
                            <Zap size={20} />
                        </div>
                        <div className="text">
                            <h4>Total CO₂ Saved</h4>
                            <p>
                                See exactly how many kilograms of CO₂ you’ve
                                prevented from entering the atmosphere.
                            </p>
                        </div>
                    </TrackItem>

                    <TrackItem>
                        <div className="icon">
                            <Award size={20} />
                        </div>
                        <div className="text">
                            <h4>Eco Levels & Badges</h4>
                            <p>
                                Progress through eco levels and unlock
                                achievements as you make an impact.
                            </p>
                        </div>
                    </TrackItem>

                    <TrackItem>
                        <div className="icon">
                            <Sprout size={20} />
                        </div>
                        <div className="text">
                            <h4>Real-World Equivalents</h4>
                            <p>
                                Understand your impact through trees planted,
                                miles avoided, and more.
                            </p>
                        </div>
                    </TrackItem>
                </TrackGrid>
            </TrackSection>
        </Page>
    );
}
