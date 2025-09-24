import { Link } from "react-router-dom";
import styled from "styled-components";
import { Search, Plus, Leaf, DollarSign, Users } from "lucide-react";
import modernHeroGraphic from "../assets/modern-hero-graphic.jpg";
import { theme } from "../styles/theme";

const Section = styled.section<{ $bg?: string }>`
    font-family: ${({ theme }) => theme.fonts.body};
    padding: 4rem 1rem;
    position: relative;
    background: ${({ $bg }) => $bg || "transparent"};
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    color: ${theme.colors.foreground};
    margin-bottom: 1rem;
    text-align: center;
`;

const Subtitle = styled.p`
    font-size: 1.125rem;
    color: ${theme.colors.mutedForeground};
    text-align: center;
    max-width: 700px;
    margin: 0 auto 2rem;
`;

const Grid = styled.div<{ $cols?: number }>`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(${({ $cols }) => $cols || 3}, 1fr);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
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
    transition: all 0.25s ease;

    ${({ $variant }) =>
        $variant === "outline"
            ? `
        border: 0.8px solid ${theme.colors.primary};
        color: ${theme.colors.primary};
        background: transparent;

        &:hover {
          background: ${theme.colors.muted}; 
          color: ${theme.colors.primaryDark};
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
      `
            : `
        background: ${theme.colors.primary};
        color: ${theme.colors.primaryForeground};

        &:hover {
          background: ${theme.colors.primaryDark}; 
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
      `}
`;

const Hero = styled(Section)`
    display: flex;
    align-items: center;
    color: ${theme.colors.foreground};
    padding: 2rem 0rem 0rem 0rem;
    margin-top: 3.8rem;
`;

const HeroContent = styled.div`
    flex: 1;
    z-index: 1;
`;

const HeroImageWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 80%;
        object-fit: cover;
        border-radius: 1rem;
    }

    @media (max-width: 768px) {
        margin-top: 2rem;
        img {
            max-width: 100%;
        }
    }
`;

const HeroTitle = styled.h1`
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;

    span {
        background: linear-gradient(
            to right,
            ${theme.colors.primary},
            ${theme.colors.primaryGlow}
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const HeroText = styled.p`
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: ${theme.colors.mutedForeground};
    max-width: 600px;
`;

const BenefitCard = styled.div`
    background: ${theme.colors.card};
    border: 1px solid ${theme.colors.mutedForeground}40;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
`;

const StatBox = styled.div`
    text-align: center;
`;

const CTABox = styled.div`
    margin: 0 auto;
    max-width: 900px;

    background: linear-gradient(
        135deg,
        ${theme.colors.primary},
        ${theme.colors.primaryGlow}
    );
    color: ${theme.colors.primaryForeground};
    padding: 3rem 2rem;
    border-radius: 1.5rem;
    text-align: center;

    h2 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
    }
    p {
        margin-bottom: 1.5rem;
        font-size: 1.05rem;
    }
`;

const CTARow = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
`;

const CTAPillButton = styled(Link)`
    margin-top: 1.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;

    background: #fff;
    color: ${theme.colors.foreground};
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 0.8rem;

    font-weight: 500;
    text-decoration: none;
    font-size: 0.8rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    }
    &:active {
        transform: translateY(0);
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
`;

const StepCard = styled.div`
    text-align: center;
    padding: 1rem;
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
    color: ${theme.colors.primaryForeground};
    background: ${theme.colors.primary};
    box-shadow: 0 8px 20px ${theme.colors.primary}55;
`;

const StepTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${theme.colors.foreground};
`;

const StepDesc = styled.p`
    color: ${theme.colors.mutedForeground};
    max-width: 360px;
    margin: 0.25rem auto 0;
    font-size: 0.975rem;
    line-height: 1.6;
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
                <Container
                    style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
                >
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
                            Join the eco-friendly ridesharing revolution.
                            Connect with fellow travelers, reduce costs, and
                            make a positive impact on the environment with every
                            journey.
                        </HeroText>
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                flexWrap: "wrap",
                            }}
                        >
                            <Button to="/search" $variant="primary">
                                <Search size={20} /> Find a Ride
                            </Button>
                            <Button to="/publish" $variant="outline">
                                <Plus size={20} /> Publish a Ride
                            </Button>
                        </div>
                    </HeroContent>

                    <HeroImageWrapper>
                        <img
                            src={modernHeroGraphic}
                            alt="Eco friendly ridesharing"
                        />
                    </HeroImageWrapper>
                </Container>
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
                            <BenefitCard key={i}>
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
                            <StatBox key={i}>
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
                        {steps.map((s) => (
                            <StepCard key={s.n}>
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
