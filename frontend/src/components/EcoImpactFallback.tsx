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
    padding: 3rem 1.5rem 4rem;
    font-family: ${({ theme }) => theme.fonts.body};
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    min-height: calc(100vh - 80px);

    @media (max-width: 1024px) {
        min-height: calc(100vh - 60px);
        padding-bottom: 3rem;
    }

    @media (max-width: 900px) {
        padding: 2.5rem 1.25rem 3rem;
    }

    @media (max-width: 640px) {
        padding: 2rem 1rem 2.5rem;
        min-height: auto;
    }

    @media (min-width: 1600px) {
        max-width: 1400px;
        padding: 5rem 2.5rem 5rem;
        min-height: calc(100vh - 120px);
    }

    @media (min-width: 1920px) {
        max-width: 1600px;
        padding: 6rem 3.5rem 6rem;
        min-height: calc(100vh - 140px);
    }
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

    @media (min-width: 1600px) {
        font-size: 3.2rem;
        margin-bottom: 3rem;
    }

    @media (min-width: 1920px) {
        font-size: 3.8rem;
        margin-bottom: 3.5rem;
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

    @media (min-width: 1600px) {
        font-size: 1.25rem;
        max-width: 850px;
    }

    @media (min-width: 1920px) {
        font-size: 1.35rem;
        max-width: 950px;
    }
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    margin: 1rem auto 1.5rem;
    opacity: 0;
    animation: ${fadeUp} 0.7s ease forwards;
    animation-delay: 0.4s;
    width: 100%;

    @media (min-width: 1600px) {
        gap: 1rem;
        margin: 1.2rem auto 1.8rem;
    }

    @media (min-width: 1920px) {
        gap: 1.2rem;
        margin: 1.5rem auto 2rem;
    }
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

    @media (min-width: 1600px) {
        padding: 1.2rem 2.5rem;
        font-size: 1.2rem;
        min-width: 230px;
    }

    @media (min-width: 1920px) {
        padding: 1.4rem 3rem;
        font-size: 1.3rem;
        border-radius: 18px;
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

    @media (min-width: 1600px) {
        padding: 1.1rem 2.4rem;
        font-size: 1.15rem;
        min-width: 230px;
    }

    @media (min-width: 1920px) {
        padding: 1.3rem 2.8rem;
        font-size: 1.25rem;
        border-radius: 18px;
    }
`;

const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
    opacity: 0;
    animation: ${fadeScale} 0.7s ease forwards;
    animation-delay: 0.5s;

    @media (min-width: 1600px) {
        gap: 2rem;
        margin-top: 2rem;
    }

    @media (min-width: 1920px) {
        gap: 2.5rem;
        margin-top: 3rem;
    }
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

    @media (min-width: 1600px) {
        padding: 2.5rem 2rem;
        .icon {
            width: 64px;
            height: 64px;
        }
        h3 {
            font-size: 1.4rem;
        }
        p {
            font-size: 1.05rem;
        }
    }

    @media (min-width: 1920px) {
        padding: 3rem 2.5rem;
        .icon {
            width: 72px;
            height: 72px;
        }
        h3 {
            font-size: 1.6rem;
        }
        p {
            font-size: 1.15rem;
        }
    }
`;

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

    @media (min-width: 1600px) {
        max-width: 1100px;
        padding: 3rem;
        h2 {
            font-size: 1.9rem;
        }
        > p {
            font-size: 1.1rem;
        }
    }

    @media (min-width: 1920px) {
        max-width: 1300px;
        padding: 3.5rem;
        h2 {
            font-size: 2.1rem;
        }
        > p {
            font-size: 1.2rem;
        }
    }
`;

const TrackGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;

    @media (min-width: 1600px) {
        gap: 2rem;
    }

    @media (min-width: 1920px) {
        gap: 2.5rem;
    }
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

    @media (min-width: 1600px) {
        .icon {
            width: 52px;
            height: 52px;
        }
        h4 {
            font-size: 1.2rem;
        }
        p {
            font-size: 1rem;
        }
    }

    @media (min-width: 1920px) {
        .icon {
            width: 60px;
            height: 60px;
        }
        h4 {
            font-size: 1.3rem;
        }
        p {
            font-size: 1.1rem;
            line-height: 1.6;
        }
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
