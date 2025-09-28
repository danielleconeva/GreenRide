import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useRides from "../hooks/useRides";
import type { Ride, RideSearchParams } from "../types/ride";
import RidesFilter from "../components/RidesFilter";
import RideCard from "../components/RideCard";

const Page = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    max-width: 1200px;
    margin: 0.5rem auto;
    padding: 0 16px;
    margin-bottom: 3rem;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 16px;

    h1 {
        margin: 0;
        font-size: 2rem;
        margin-bottom: 0.4rem;
    }
    .meta {
        color: #6b7280;
        margin-bottom: 1rem;
    }
`;

const Layout = styled.div`
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 20px;

    @media (max-width: 920px) {
        grid-template-columns: 1fr;
    }
`;

const List = styled.div`
    display: grid;
    gap: 16px;
`;

const Panel = styled.div`
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    background: #fff;
    padding: 16px;
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
`;

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

    return (
        <Page>
            <Header>
                <h1>Available Rides</h1>
                <div className="meta">
                    {headerLine} {isFetching ? "• updating…" : ""}
                </div>
            </Header>

            <Layout>
                <RidesFilter />

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

                    {!isLoading && !error && data && data.length > 0 && (
                        <List>
                            {data.map((ride: Ride) => (
                                <RideCard key={ride._id} ride={ride} />
                            ))}
                        </List>
                    )}
                </div>
            </Layout>
        </Page>
    );
}
