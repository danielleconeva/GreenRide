import styled from "styled-components";
import { useEcoStats } from "../hooks/useEcoStats";

import { Leaf, Award, Zap, Car, Home, Trophy, Sprout } from "lucide-react";

const Page = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    font-family: ${({ theme }) => theme.fonts.body};
    background: #fff;
    min-height: 100vh;
`;

const Header = styled.header`
    margin-bottom: 2.5rem;
    text-align: center;

    h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
        color: #111827;
    }
    p {
        color: #6b7280;
        font-size: 1rem;
        max-width: 650px;
        margin: 0 auto;
        line-height: 1.5;
    }
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
    margin-bottom: 2.5rem;
`;
const Card = styled.div`
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
        transform: translateY(-4px); /* smoother lift */
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); /* soft shadow */
    }

    .icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #ecfdf5; /* unified green background */
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        color: #14b8a6; /* green icon */
        transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }

    &:hover .icon-wrapper {
        background: #14b8a6; /* invert background */
        color: #fff; /* invert icon color */
        transform: scale(1.05); /* gentle pulse */
    }

    h2 {
        font-size: 1.75rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary};
        margin-bottom: 0.5rem;
        transition: color 0.3s ease;
    }

    &:hover h2 {
        color: #0f766e; /* slightly darker green */
    }

    p {
        font-size: 0.875rem;
        color: #6b7280;
    }
`;

const Section = styled.section`
    margin-top: 2.5rem;
    background: #fff;
    border-radius: 16px;
    padding: 1.5rem 3rem;
    border: 1px solid #e5e7eb;

    h3 {
        font-size: 1.125rem;
        font-weight: 700;
        margin-bottom: 1.25rem;
        color: #111827;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

const AchievementList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* ✅ always 2 per row */
    gap: 3rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr; /* ✅ stack on smaller screens */
    }
`;
const AchievementCard = styled.div<{ unlocked: boolean }>`
    padding: 1.25rem;
    padding-right: 4rem;
    border-radius: 12px;
    border: 1px solid ${({ unlocked }) => (unlocked ? "#14b8a6" : "#e5e7eb")};
    background: ${({ unlocked }) => (unlocked ? "#f6fffe" : "#fff")};
    opacity: ${({ unlocked }) => (unlocked ? 1 : 0.7)};
    transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;

    &:hover {
        opacity: 1;
        transform: translateY(-4px); /* subtle movement */
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); /* gentle hover shadow */
    }

    .achievement-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
    }

    .icon-wrapper {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${({ unlocked }) => (unlocked ? "#14b8a6" : "#ecfdf5")};
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ unlocked }) => (unlocked ? "#fff" : "#14b8a6")};
        flex-shrink: 0;
    }

    strong {
        font-size: 1rem;
        color: #111827;
    }

    p {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 0.75rem;
        margin-left: 3.25rem;
    }

    small {
        display: block;
        margin-left: 3.25rem;
        margin-top: 0.5rem;
        color: ${({ unlocked }) => (unlocked ? "#14b8a6" : "#6b7280")};
        font-weight: 500;
        font-size: 0.8rem;
    }
`;

const ProgressBar = styled.div<{ progress: number }>`
    margin-top: 0.75rem;
    margin-left: 3.25rem;
    height: 8px;
    border-radius: 4px;
    background: #e5e7eb;
    overflow: hidden;

    &::after {
        content: "";
        display: block;
        height: 100%;
        width: ${({ progress }) => progress}%;
        background: #14b8a6;
        transition: width 0.3s ease;
        border-radius: 4px;
    }
`;

const ImpactGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.25rem;
    margin-top: 1.25rem;
`;
const ImpactCard = styled.div`
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    padding: 1.25rem;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-4px); /* subtle lift */
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); /* soft glow */
    }

    .icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #ecfdf5;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 0.75rem;
        color: #14b8a6;
        transition: background 0.3s ease, transform 0.3s ease;
    }

    &:hover .icon-wrapper {
        background: #14b8a6; /* invert colors on hover */
        color: #fff;
        transform: scale(1.05); /* tiny pulse */
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #14b8a6;
        margin-bottom: 0.5rem;
        transition: color 0.3s ease;
    }

    &:hover h2 {
        color: #0f766e; /* darker green on hover */
    }

    p {
        font-size: 0.85rem;
        color: #6b7280;
    }
`;

export default function EcoImpactPage() {
    const { data, isLoading, error } = useEcoStats();

    if (isLoading)
        return (
            <Page>
                <p>Loading eco stats…</p>
            </Page>
        );
    if (error)
        return (
            <Page>
                <p>Failed to load eco stats.</p>
            </Page>
        );
    if (!data)
        return (
            <Page>
                <p>No data found.</p>
            </Page>
        );

    return (
        <Page>
            <Header>
                <h1>Eco Dashboard</h1>
                <p>
                    Track your positive environmental impact and see how your
                    ridesharing choices are helping build a more sustainable
                    future.
                </p>
            </Header>

            <StatsGrid>
                <Card>
                    <div className="icon-wrapper">
                        <Leaf size={24} />
                    </div>
                    <h2>{data.ecoStats.co2SavedKg} kg</h2>
                    <p>Total CO₂ Saved</p>
                </Card>

                <Card>
                    <div className="icon-wrapper">
                        <Zap size={24} />
                    </div>
                    <h2>
                        {(
                            (data.ecoStats.co2SavedKg / 1000) *
                            0.00000045 *
                            1_000_000
                        ).toFixed(4)}{" "}
                        µ°C
                    </h2>
                    <p>global warming prevented</p>
                </Card>

                <Card>
                    <div className="icon-wrapper">
                        <Award size={24} />
                    </div>
                    <h2>{data.ecoStats.totalRides}</h2>
                    <p>Total Rides</p>
                </Card>
            </StatsGrid>
            <Section>
                <h3>
                    <Trophy size={18} />
                    Eco Achievements
                </h3>
                <p
                    style={{
                        color: "#6b7280",
                        marginBottom: "1.25rem",
                        fontSize: "0.95rem",
                    }}
                >
                    Unlock badges as you continue your sustainable journey
                </p>
                <AchievementList>
                    {data.achievements.map((a) => (
                        <AchievementCard key={a.name} unlocked={a.unlocked}>
                            <div className="achievement-header">
                                <div className="icon-wrapper">
                                    {a.unlocked ? (
                                        <Award size={20} />
                                    ) : (
                                        <Leaf size={20} />
                                    )}
                                </div>
                                <strong>{a.name}</strong>
                            </div>
                            <p>{a.description}</p>
                            <ProgressBar progress={a.progress} />
                            <small>
                                {a.unlocked && a.unlockedAt
                                    ? `Unlocked ${new Date(
                                          a.unlockedAt
                                      ).toLocaleDateString(undefined, {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                      })}`
                                    : `Progress: ${a.current}/${a.target}`}
                            </small>
                        </AchievementCard>
                    ))}
                </AchievementList>
            </Section>
            <Section>
                <h3>Your Impact in Perspective</h3>
                <p
                    style={{
                        color: "#6b7280",
                        marginBottom: "1.25rem",
                        fontSize: "0.95rem",
                    }}
                >
                    Your {data.ecoStats.co2SavedKg}kg CO₂ savings is equivalent
                    to:
                </p>
                <ImpactGrid>
                    <ImpactCard>
                        <div className="icon-wrapper">
                            <Sprout size={24} />
                        </div>
                        <h2>{Math.floor(data.ecoStats.co2SavedKg / 22)}</h2>
                        <p>equivalent trees planted</p>
                    </ImpactCard>
                    <ImpactCard>
                        <div className="icon-wrapper">
                            <Zap size={24} />
                        </div>
                        <h2>{Math.floor(data.ecoStats.co2SavedKg * 180)}</h2>
                        <p>smartphone charges saved</p>
                    </ImpactCard>
                    <ImpactCard>
                        <div className="icon-wrapper">
                            <Car size={24} />
                        </div>
                        <h2>{Math.floor(data.ecoStats.co2SavedKg * 2.5)}</h2>
                        <p>miles of car driving avoided</p>
                    </ImpactCard>
                    <ImpactCard>
                        <div className="icon-wrapper">
                            <Home size={24} />
                        </div>
                        <h2>{Math.floor(data.ecoStats.co2SavedKg / 30)}</h2>
                        <p>days of home energy saved</p>
                    </ImpactCard>
                </ImpactGrid>
            </Section>
        </Page>
    );
}
