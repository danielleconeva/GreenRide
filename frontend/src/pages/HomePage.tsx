import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Search, Plus, Leaf, DollarSign, Users } from "lucide-react";
import modernHeroGraphic from "../assets/modern-hero-graphic.jpg";
import { theme } from "../styles/theme";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const Section = styled.section<{ $bg?: string }>`
    font-family: ${({ theme }) => theme.fonts.body};
    padding: 4rem 1rem;
    position: relative;
    background: ${({ $bg }) => $bg || "transparent"};
    margin: 0 2rem;

    @media (max-width: 640px) {
        padding: 1rem 1rem;
    }
    @media (max-width: 1050px) {
        padding: 2rem 1rem;
    }

    @media (min-width: 1600px) {
        padding: 4rem 2rem;
    }

    @media (min-width: 1920px) {
        padding: 4rem 2rem;
    }
`;

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    max-width: 1200px;

    @media (max-width: 640px) {
        width: auto;
    }
    @media (min-width: 1440px) {
        max-width: 1400px;
    }

    @media (min-width: 1600px) {
        max-width: 1500px;
    }

    @media (min-width: 1920px) {
        max-width: 1600px;
    }
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.foreground};
    margin-bottom: 1rem;
    text-align: center;

    @media (max-width: 640px) {
        font-size: 1.8rem;
    }

    @media (min-width: 1920px) {
        font-size: 3rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.mutedForeground};
    text-align: center;
    max-width: 700px;
    margin: 0 auto 2rem;

    @media (max-width: 640px) {
        font-size: 1rem;
        max-width: 90%;
    }

    @media (min-width: 1920px) {
        font-size: 1.25rem;
        max-width: 850px;
    }
`;

const Grid = styled.div<{ $cols?: number }>`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(${({ $cols }) => $cols || 3}, 1fr);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }

    @media (min-width: 1920px) {
        gap: 3rem;
    }
`;

const Button = styled(Link)<{ $variant?: "primary" | "outline" }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease,
        box-shadow 0.2s ease;

    ${({ $variant, theme }) =>
        $variant === "outline"
            ? `
        border: 1px solid ${theme.colors.primary};
        color: ${theme.colors.primary};
        background: transparent;
        &:hover {
          background: #ffffffed;
          color: ${theme.colors.primaryDark};
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 4px 17px rgba(0,0,0,0.06);
        }
      `
            : `
        background: ${theme.colors.primary};
        color: ${theme.colors.primaryForeground};
        &:hover {
          background: #22a499;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 6px 17px rgba(0, 0, 0, 0.12);
        }
      `}

    @media (max-width: 640px) {
        width: 100%;
        padding: 0.9rem 1.25rem;
        font-size: 0.95rem;
    }

    @media (min-width: 1920px) {
        font-size: 1.1rem;
        padding: 1rem 1.75rem;
    }
`;

const Hero = styled(Section)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.foreground};
    padding: 4rem 2rem;
    margin-top: 3.8rem;
    gap: 2rem;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 1200px) {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
        padding: 3rem 1.5rem;
    }

    @media (max-width: 900px) {
        gap: 1.8rem;
    }

    @media (max-width: 640px) {
        gap: 1.5rem;
        padding: 1rem 1rem;
        margin-top: 1rem;
    }

    @media (min-width: 1600px) {
        max-width: 1700px;
        gap: 1.8rem;
        padding: 5rem 3rem;
    }

    @media (min-width: 1920px) {
        max-width: 1900px;
        gap: 2rem;
        padding: 6rem 4rem;
    }
`;

const HeroContent = styled.div`
    flex: 1.2;
    z-index: 1;
    animation: ${fadeUp} 0.8s ease forwards;
    max-width: 650px;

    @media (max-width: 1200px) {
        order: -1;
        max-width: 90%;
        margin: 0 auto;
        text-align: center;
        width: 100%;
    }

    @media (max-width: 640px) {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media (min-width: 1600px) {
        max-width: 750px;
    }

    @media (min-width: 1920px) {
        max-width: 850px;
    }
`;

const HeroImageWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    img {
        width: 100%;
        max-width: 480px;
        height: auto;
        object-fit: contain;
        border-radius: 1rem;
        animation: ${fadeIn} 1s ease forwards;
        transition: max-width 0.3s ease;
    }

    @media (max-width: 1200px) {
        order: 1;
        justify-content: center;
        width: 100%;

        img {
            max-width: 55%;
            margin: 0 auto;
        }
    }

    @media (max-width: 900px) {
        img {
            max-width: 50%;
        }
    }

    @media (max-width: 640px) {
        img {
            max-width: 65%;
        }
    }

    @media (min-width: 1600px) {
        img {
            max-width: 550px;
        }
    }

    @media (min-width: 1920px) {
        img {
            max-width: 600px;
        }
    }
`;

const HeroTitle = styled.h1`
    font-size: clamp(2rem, 4.5vw, 3rem);
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;

    span {
        background: linear-gradient(
            to right,
            ${({ theme }) => theme.colors.primary},
            ${({ theme }) => theme.colors.primaryGlow}
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    @media (max-width: 640px) {
        text-align: center;
        margin: 0 auto 1rem;
    }

    @media (max-width: 900px) {
        font-size: 2rem;
    }

    @media (min-width: 1600px) {
        font-size: 3.5rem;
    }

    @media (min-width: 1920px) {
        font-size: 4rem;
    }
`;

const HeroText = styled.p`
    font-size: clamp(1rem, 1.6vw, 1.3rem);
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.mutedForeground};
    line-height: 1.6;

    @media (max-width: 900px) {
        margin: 0.5rem auto 1.5rem;
        max-width: 90%;
    }

    @media (min-width: 1600px) {
        font-size: 1.4rem;
    }

    @media (min-width: 1920px) {
        font-size: 1.5rem;
    }
`;

const BenefitCard = styled.div<{ $delay?: number }>`
    background: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.mutedForeground}30;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    perspective: 1000px;
    opacity: 0;
    animation: ${fadeUp} 0.6s ease forwards;
    animation-delay: ${({ $delay }) => $delay || 0}s;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.35s ease;

    &:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08),
            0 4px 8px rgba(0, 0, 0, 0.06);
    }

    @media (min-width: 1920px) {
        padding: 2.5rem;
    }
`;

const StatBox = styled.div<{ $delay?: number }>`
    text-align: center;
    opacity: 0;
    animation: ${fadeIn} 0.6s ease forwards;
    animation-delay: ${({ $delay }) => $delay || 0}s;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    @media (min-width: 1920px) {
        transform: scale(1.1);
    }
`;

const CTABox = styled.div`
    margin: 0 auto;
    max-width: 900px;
    background: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.primary},
        ${({ theme }) => theme.colors.primaryGlow}
    );
    color: ${({ theme }) => theme.colors.primaryForeground};
    padding: 3rem 2rem;
    border-radius: 1.5rem;
    text-align: center;

    @media (max-width: 640px) {
        padding: 2rem 1rem;
        border-radius: 1rem;
    }

    @media (min-width: 1920px) {
        max-width: 1100px;
        padding: 4rem 3rem;
    }
`;

const CTARow = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;

    @media (min-width: 1920px) {
        gap: 1.5rem;
    }
`;

const CTAPillButton = styled(Link)`
    margin-top: 1.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: #fff;
    color: ${({ theme }) => theme.colors.foreground};
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 0.8rem;
    font-weight: 500;
    text-decoration: none;
    font-size: 0.8rem;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.muted};
        transform: translateY(-1px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 900px) {
        font-size: 0.75rem;
        padding: 0.65rem 1rem;
        gap: 0.4rem;
    }

    @media (max-width: 640px) {
        font-size: 0.7rem;
        padding: 0.6rem 0.9rem;
        gap: 0.35rem;
    }

    @media (min-width: 1600px) {
        font-size: 0.9rem;
        padding: 0.85rem 1.4rem;
    }

    @media (min-width: 1920px) {
        font-size: 0.95rem;
        padding: 0.9rem 1.5rem;
    }
`;

const StepsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2rem;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }

    @media (min-width: 1920px) {
        gap: 3rem;
    }
`;

const StepCard = styled.div<{ $delay?: number }>`
    text-align: center;
    padding: 1.5rem;
    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.mutedForeground}25;
    opacity: 0;
    animation: ${fadeUp} 0.6s ease forwards;
    animation-delay: ${({ $delay }) => $delay || 0}s;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.35s ease, background 0.35s ease;

    &:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    }

    @media (min-width: 1920px) {
        padding: 2rem;
    }
`;

const StepCircle = styled.div`
    height: 64px;
    width: 64px;
    border-radius: 9999px;
    margin: 0 auto 1rem;
    display: grid;
    place-items: center;
    font-weight: 700;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.primaryForeground};
    background: ${({ theme }) => theme.colors.primary};

    @media (min-width: 1920px) {
        height: 72px;
        width: 72px;
        font-size: 1.35rem;
    }
`;

const StepTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.foreground};

    @media (min-width: 1920px) {
        font-size: 1.25rem;
    }
`;

const StepDesc = styled.p`
    color: ${({ theme }) => theme.colors.mutedForeground};
    max-width: 360px;
    margin: 0.25rem auto 0;
    font-size: 0.975rem;
    line-height: 1.6;

    @media (min-width: 1920px) {
        font-size: 1.05rem;
        max-width: 420px;
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.7rem;

    a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: #14b8a6;
        font-size: 3.2rem;
        font-weight: bold;

        &:hover {
            color: #0d9488;
        }

        @media (max-width: 640px) {
            font-size: 2.4rem;
        }

        @media (min-width: 1920px) {
            font-size: 3.6rem;
        }
    }
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    @media (max-width: 1200px) {
        justify-content: center;
    }
`;

export default function HomePage() {
    const benefits = [
        {
            icon: <Leaf size={32} color={theme.colors.primary} />,
            title: "Eco-Friendly",
            description:
                "Reduce your carbon footprint by sharing rides and protecting our planet.",
        },
        {
            icon: <DollarSign size={32} color={theme.colors.primary} />,
            title: "Cost Effective",
            description:
                "Split travel costs with other passengers and save money on every trip.",
        },
        {
            icon: <Users size={32} color={theme.colors.primary} />,
            title: "Community",
            description:
                "Meet like-minded travelers and build connections along your journey.",
        },
    ];

    const stats = [
        { number: "50,000+", label: "Happy Riders" },
        { number: "1.2M kg", label: "CO₂ Saved" },
        { number: "25,000+", label: "Successful Trips" },
        { number: "4.9/5", label: "Average Rating" },
    ];

    const steps = [
        {
            n: 1,
            title: "Search or Publish",
            desc: "Find available rides or publish your own journey to share with others.",
        },
        {
            n: 2,
            title: "Connect & Book",
            desc: "Connect with fellow travelers and book your seat securely.",
        },
        {
            n: 3,
            title: "Travel & Save",
            desc: "Enjoy your journey while saving money and protecting the environment.",
        },
    ];

    return (
        <>
            <Hero>
                <HeroContent>
                    <LogoWrapper>
                        <Link to="/">
                            <Leaf size={40} />
                            <span>GreenRide</span>
                        </Link>
                    </LogoWrapper>
                    <HeroTitle>
                        Share a ride, <span>save the planet</span>
                    </HeroTitle>
                    <HeroText>
                        Join the eco-friendly ridesharing revolution. Connect
                        with fellow travelers, reduce costs, and make a positive
                        impact on the environment with every journey.
                    </HeroText>
                    <ButtonRow>
                        <Button to="/search" $variant="primary">
                            <Search size={20} /> Find a Ride
                        </Button>
                        <Button to="/publish" $variant="outline">
                            <Plus size={20} /> Publish a Ride
                        </Button>
                    </ButtonRow>
                </HeroContent>

                <HeroImageWrapper>
                    <img
                        src={modernHeroGraphic}
                        alt="Eco friendly ridesharing"
                    />
                </HeroImageWrapper>
            </Hero>

            <Section>
                <Container>
                    <Title>The Smart Way to Travel</Title>
                    <Subtitle>
                        Discover the benefits of shared transportation and be
                        part of the sustainable mobility movement.
                    </Subtitle>
                    <Grid>
                        {benefits.map((b, i) => (
                            <BenefitCard key={i} $delay={i * 0.2}>
                                {b.icon}
                                <h3>{b.title}</h3>
                                <p>{b.description}</p>
                            </BenefitCard>
                        ))}
                    </Grid>
                </Container>
            </Section>

            <Section $bg={theme.colors.muted}>
                <Container>
                    <Grid $cols={4}>
                        {stats.map((s, i) => (
                            <StatBox key={i} $delay={i * 0.15}>
                                <div
                                    style={{
                                        fontSize: "2rem",
                                        fontWeight: 700,
                                        color: theme.colors.primary,
                                    }}
                                >
                                    {s.number}
                                </div>
                                <div
                                    style={{
                                        color: theme.colors.mutedForeground,
                                    }}
                                >
                                    {s.label}
                                </div>
                            </StatBox>
                        ))}
                    </Grid>
                </Container>
            </Section>

            <Section $bg="linear-gradient(180deg, rgba(15,23,42,0.02) 0%, transparent 100%)">
                <Container>
                    <Title>How GreenRide Works</Title>
                    <Subtitle>
                        Start your eco-friendly journey in just a few simple
                        steps.
                    </Subtitle>

                    <StepsGrid>
                        {steps.map((s, i) => (
                            <StepCard key={s.n} $delay={i * 0.2}>
                                <StepCircle>{s.n}</StepCircle>
                                <StepTitle>{s.title}</StepTitle>
                                <StepDesc>{s.desc}</StepDesc>
                            </StepCard>
                        ))}
                    </StepsGrid>
                </Container>
            </Section>

            <Section>
                <Container>
                    <CTABox>
                        <h2>Ready to Start Your Green Journey?</h2>
                        <p>
                            Join thousands of eco-conscious travelers making a
                            difference, one ride at a time.
                        </p>
                        <CTARow>
                            <CTAPillButton to="/search">
                                <Search size={18} /> Find Your Ride
                            </CTAPillButton>
                            <CTAPillButton to="/publish">
                                <Plus size={18} /> Share Your Ride
                            </CTAPillButton>
                        </CTARow>
                    </CTABox>
                </Container>
            </Section>
        </>
    );
}
