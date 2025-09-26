import { useEffect, useState } from "react";

interface CitiesResponse {
    data: string[];
}

export function useCities(country: string = "bulgaria") {
    const [cities, setCities] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCities() {
            setLoading(true);
            try {
                const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ country: country }),
                });
                const json: CitiesResponse = await res.json();
                setCities(json.data || []);
            } catch (err) {
                setError("Failed to load cities");
            } finally {
                setLoading(false);
            }
        }
        fetchCities();
    }, [country]);

    return { cities, loading, error };
}
