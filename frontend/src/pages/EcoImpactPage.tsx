import styled, { keyframes } from "styled-components";
import { useEcoStats } from "../hooks/useEcoStats";
import { Leaf, Award, Zap, Car, Home, Trophy, Sprout } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import EcoImpactFallback from "../components/EcoImpactFallback";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const Page = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    font-family: ${({ theme }) => theme.fonts.body};
    background: #fff;
    min-height: 100vh;
    opacity: 0;
    animation: ${fadeUp} 0.8s ease forwards;

    @media (max-width: 900px) {
        padding: 1.5rem 1rem;
    }

    @media (max-width: 640px) {
        padding: 1rem 0.75rem;
        min-height: auto;
    }

    @media (min-width: 1600px) {
        max-width: 1400px;
        padding: 3rem 2rem;
    }

    @media (min-width: 1920px) {
        max-width: 1600px;
        padding: 4rem 3rem;
    }
`;

export const Header = styled.header`
    margin-bottom: 2.5rem;
    text-align: center;

    h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
        color: #111827;
        opacity: 0;
        animation: ${fadeUp} 0.8s ease forwards;
        animation-delay: 0.1s;
    }

    p {
        color: #6b7280;
        font-size: 1rem;
        max-width: 650px;
        margin: 0 auto;
        line-height: 1.5;
        opacity: 0;
        animation: ${fadeUp} 0.8s ease forwards;
        animation-delay: 0.2s;
    }

    @media (max-width: 640px) {
        margin-bottom: 2rem;

        h1 {
            font-size: 1.6rem;
        }

        p {
            font-size: 0.9rem;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        h1 {
            font-size: 2.2rem;
        }

        p {
            font-size: 1.1rem;
        }
    }

    @media (min-width: 1600px) {
        h1 {
            font-size: 2.4rem;
        }

        p {
            font-size: 1.15rem;
        }
    }

    @media (min-width: 1920px) {
        h1 {
            font-size: 2.6rem;
        }

        p {
            font-size: 1.25rem;
        }
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
    margin-bottom: 2.5rem;
    opacity: 0;
    animation: ${fadeInScale} 0.8s ease forwards;
    animation-delay: 0.3s;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }

    @media (min-width: 1600px) {
        gap: 1.75rem;
    }

    @media (min-width: 1920px) {
        gap: 2rem;
    }
`;

export const Card = styled.div`
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }

    .icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #ecfdf5;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        color: #14b8a6;
        transition: all 0.3s ease;
    }

    &:hover .icon-wrapper {
        background: #14b8a6;
        color: #fff;
        transform: scale(1.05);
    }

    h2 {
        font-size: 1.75rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary};
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 0.875rem;
        color: #6b7280;
    }

    @media (max-width: 640px) {
        padding: 1.25rem;

        .icon-wrapper {
            width: 42px;
            height: 42px;
        }

        h2 {
            font-size: 1.5rem;
        }

        p {
            font-size: 0.8rem;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        padding: 2rem;

        .icon-wrapper {
            width: 56px;
            height: 56px;
        }

        h2 {
            font-size: 1.9rem;
        }

        p {
            font-size: 0.95rem;
        }
    }

    @media (min-width: 1600px) {
        padding: 2rem;

        h2 {
            font-size: 2rem;
        }
    }

    @media (min-width: 1920px) {
        padding: 2.25rem;

        h2 {
            font-size: 2.2rem;
        }

        p {
            font-size: 1rem;
        }
    }
`;

export const Section = styled.section`
    margin-top: 2.5rem;
    background: #fff;
    border-radius: 16px;
    padding: 1.5rem 3rem;
    border: 1px solid #e5e7eb;
    opacity: 0;
    animation: ${fadeUp} 0.8s ease forwards;
    animation-delay: 0.4s;

    h3 {
        font-size: 1.125rem;
        font-weight: 700;
        margin-bottom: 1.25rem;
        color: #111827;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    @media (max-width: 900px) {
        padding: 1.25rem 1.5rem;
    }

    @media (max-width: 640px) {
        padding: 1.25rem;
        h3 {
            font-size: 1rem;
        }
    }

    @media (min-width: 1600px) {
        padding: 2rem 4rem;

        h3 {
            font-size: 1.3rem;
        }
    }

    @media (min-width: 1920px) {
        padding: 2.5rem 5rem;

        h3 {
            font-size: 1.45rem;
        }
    }
`;

export const AchievementList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    @media (min-width: 1600px) {
        gap: 3.5rem;
    }

    @media (min-width: 1920px) {
        gap: 4rem;
    }
`;

export const AchievementCard = styled.div<{ unlocked: boolean }>`
    padding: 1.25rem;
    padding-right: 4rem;
    border-radius: 12px;
    border: 1px solid ${({ unlocked }) => (unlocked ? "#14b8a6" : "#e5e7eb")};
    background: ${({ unlocked }) => (unlocked ? "#f6fffe" : "#fff")};
    opacity: ${({ unlocked }) => (unlocked ? 1 : 0.7)};
    transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;

    &:hover {
        opacity: 1;
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
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

    @media (max-width: 640px) {
        padding: 1rem;
        strong {
            font-size: 0.95rem;
        }
        p {
            font-size: 0.8rem;
            margin-left: 2.5rem;
        }
        small {
            font-size: 0.75rem;
            margin-left: 2.5rem;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        padding: 1.75rem;
        strong {
            font-size: 1.1rem;
        }
        p {
            font-size: 0.95rem;
        }
        small {
            font-size: 0.85rem;
        }
    }

    @media (min-width: 1600px) {
        padding: 1.75rem 4rem;
        strong {
            font-size: 1.1rem;
        }
    }

    @media (min-width: 1920px) {
        padding: 2rem 5rem;
        strong {
            font-size: 1.2rem;
        }
        p {
            font-size: 0.95rem;
        }
    }
`;

export const ProgressBar = styled.div<{ progress: number }>`
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

export const ImpactGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.25rem;
    margin-top: 1.25rem;
    opacity: 0;
    animation: ${fadeInScale} 0.8s ease forwards;
    animation-delay: 0.5s;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 1600px) {
        gap: 1.75rem;
    }

    @media (min-width: 1920px) {
        gap: 2rem;
    }
`;

export const ImpactCard = styled.div`
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    padding: 1.25rem;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
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
        background: #14b8a6;
        color: #fff;
        transform: scale(1.05);
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #14b8a6;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 0.85rem;
        color: #6b7280;
    }

    @media (max-width: 640px) {
        padding: 1rem;
        h2 {
            font-size: 1.3rem;
        }
        p {
            font-size: 0.8rem;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        padding: 1.75rem;
        h2 {
            font-size: 1.7rem;
        }
        p {
            font-size: 0.95rem;
        }
    }

    @media (min-width: 1600px) {
        padding: 1.75rem;
        h2 {
            font-size: 1.8rem;
        }
    }

    @media (min-width: 1920px) {
        padding: 2rem;
        h2 {
            font-size: 2rem;
        }
        p {
            font-size: 1rem;
        }
    }
`;

export default function EcoImpactPage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const { data, isLoading, error } = useEcoStats(!!user);

    if (!user) {
        return <EcoImpactFallback />;
    }
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
