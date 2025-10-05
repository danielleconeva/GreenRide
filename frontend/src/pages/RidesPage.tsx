import { useSearchParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import useRides from "../hooks/useRides";
import type { Ride, RideSearchParams } from "../types/ride";
import RidesFilter from "../components/RidesFilter";
import RideCard from "../components/RideCard";
import { useMemo, useState } from "react";

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeScale = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const Page = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    max-width: 1200px;
    margin: 0.5rem auto;
    padding: 0 16px;
    margin-bottom: 3rem;
    opacity: 0;
    animation: ${fadeSlideUp} 0.7s ease forwards;

    @media (max-width: 900px) {
        max-width: 100%;
        padding: 0 2rem;
    }

    @media (max-width: 640px) {
        padding: 0 1.5rem;
        margin-bottom: 2.5rem;
    }

    @media (min-width: 1600px) {
        max-width: 1400px;
        padding: 0 24px;
    }

    @media (min-width: 1920px) {
        max-width: 1600px;
        padding: 0 32px;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 16px;

    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.2s;

    h1 {
        margin: 0;
        font-size: 2.2rem;
        margin-bottom: 0.4rem;
        color: ${({ theme }) => theme.colors.foreground};
    }

    .meta {
        color: #6b7280;
        margin-bottom: 1rem;
        font-size: 1rem;
    }

    @media (max-width: 900px) {
        h1 {
            font-size: 2rem;
        }
        .meta {
            font-size: 0.95rem;
        }
    }

    @media (max-width: 640px) {
        align-items: flex-start;
        margin-bottom: 1rem;
        h1 {
            font-size: 1.8rem;
        }
        .meta {
            font-size: 0.9rem;
        }
    }

    @media (min-width: 1600px) {
        gap: 14px;
        margin-bottom: 20px;
        h1 {
            font-size: 2.5rem;
        }
        .meta {
            font-size: 1.05rem;
        }
    }

    @media (min-width: 1920px) {
        h1 {
            font-size: 2.8rem;
        }
        .meta {
            font-size: 1.1rem;
        }
    }
`;

const Layout = styled.div`
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 20px;

    opacity: 0;
    animation: ${fadeScale} 0.7s ease forwards;
    animation-delay: 0.3s;

    @media (max-width: 920px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    @media (max-width: 640px) {
        gap: 14px;
        margin-top: 1rem;
    }

    @media (min-width: 1600px) {
        grid-template-columns: 360px 1fr;
        gap: 28px;
    }

    @media (min-width: 1920px) {
        grid-template-columns: 400px 1fr;
        gap: 36px;
    }
`;

const List = styled.div`
    display: grid;
    gap: 16px;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.4s;

    @media (max-width: 640px) {
        gap: 12px;
        margin: 1rem 0;
    }

    @media (min-width: 1600px) {
        gap: 20px;
    }

    @media (min-width: 1920px) {
        gap: 24px;
    }
`;

const Panel = styled.div`
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    background: #fff;
    padding: 16px;

    opacity: 0;
    animation: ${fadeScale} 0.6s ease forwards;
    animation-delay: 0.3s;

    @media (max-width: 640px) {
        padding: 14px;
    }

    @media (min-width: 1600px) {
        padding: 20px;
        border-radius: 16px;
    }

    @media (min-width: 1920px) {
        padding: 24px;
        border-radius: 18px;
    }
`;

const Empty = styled(Panel)`
    text-align: center;
    color: #6b7280;
`;

const Skeleton = styled.div`
    height: 120px;
    border-radius: 12px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%);
    background-size: 400% 100%;
    animation: shimmer 1.1s infinite;

    @keyframes shimmer {
        0% {
            background-position: 100% 0;
        }
        100% {
            background-position: -100% 0;
        }
    }

    @media (min-width: 1600px) {
        height: 130px;
    }

    @media (min-width: 1920px) {
        height: 140px;
    }
`;

const RideItem = styled.div`
    opacity: 0;
    animation: ${fadeSlideUp} 0.5s ease forwards;
`;

export type ActiveFilters = {
    airConditioning: boolean;
    music: boolean;
    smokingAllowed: boolean;
    petsAllowed: boolean;
};

export default function RidesPage() {
    const [searchParams] = useSearchParams();

    const params: RideSearchParams = {
        from: (searchParams.get("from") || "").trim(),
        to: (searchParams.get("to") || "").trim(),
        date: searchParams.get("date") || "",
        passengers: searchParams.get("passengers") || "1",
    };

    const { data, isLoading, isFetching, error } = useRides(params);

    const count = data?.length ?? 0;
    const headerLine = `${params.from || "—"} → ${params.to || "—"} • ${
        params.date || "Any date"
    } • ${params.passengers} ${
        Number(params.passengers) > 1 ? "passengers" : "passenger"
    }`;

    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        airConditioning: false,
        music: false,
        smokingAllowed: false,
        petsAllowed: false,
    });

    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<
        "departure" | "priceAsc" | "priceDesc" | "seatsDesc"
    >("departure");

    const filteredRides = useMemo(() => {
        if (!data) return [];

        return data
            .filter((ride) => {
                if (maxPrice && ride.pricePerSeat > maxPrice) return false;
                if (
                    activeFilters.airConditioning &&
                    !ride.amenities.airConditioning
                )
                    return false;
                if (activeFilters.music && !ride.amenities.music) return false;
                if (
                    activeFilters.smokingAllowed &&
                    !ride.amenities.smokingAllowed
                )
                    return false;
                if (activeFilters.petsAllowed && !ride.amenities.petsAllowed)
                    return false;
                return true;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case "priceAsc":
                        return a.pricePerSeat - b.pricePerSeat;
                    case "priceDesc":
                        return b.pricePerSeat - a.pricePerSeat;
                    case "seatsDesc":
                        return b.seatsAvailable - a.seatsAvailable;
                    default:
                        return 0;
                }
            });
    }, [data, activeFilters, maxPrice, sortBy]);

    return (
        <Page>
            <Header>
                <h1>Available Rides</h1>
                <div className="meta">
                    {headerLine} {isFetching ? "• updating…" : ""}
                </div>
            </Header>

            <Layout>
                {!isLoading && (
                    <RidesFilter
                        data={data}
                        activeFilters={activeFilters}
                        setActiveFilters={setActiveFilters}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                )}

                <div>
                    <div style={{ color: "#6b7280", marginBottom: 20 }}>
                        {isLoading
                            ? "Loading…"
                            : `${count} ride${count === 1 ? "" : "s"} found`}
                    </div>

                    {error && (
                        <Empty>Couldn’t load rides. Please try again.</Empty>
                    )}

                    {isLoading && (
                        <List>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </List>
                    )}

                    {!isLoading && !error && data && data.length === 0 && (
                        <Empty>
                            No rides found. Try a different date or nearby
                            cities.
                        </Empty>
                    )}

                    {!isLoading && !error && filteredRides.length > 0 && (
                        <List>
                            {filteredRides.map((ride: Ride, i) => (
                                <RideItem
                                    key={ride._id}
                                    style={{ animationDelay: `${0.1 * i}s` }}
                                >
                                    <RideCard ride={ride} />
                                </RideItem>
                            ))}
                        </List>
                    )}
                </div>
            </Layout>
        </Page>
    );
}
