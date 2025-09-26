import { useState } from "react";
import styled from "styled-components";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useCities } from "../hooks/useCtities";

const Card = styled.div`
    width: 100%;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 1rem;
    padding-bottom: 2.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    margin-top: 0;
`;

const Form = styled.form`
    display: flex;
    display: block;
    width: 900px;
    padding-left: 1.5rem;
`;

const Group = styled.div`
    display: block;
    margin-bottom: 20px;
    flex: 1 1 300px;
    margin: 1rem 1rem;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
`;

const FieldWrap = styled.div`
    position: relative;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    height: 44px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #fff;
    color: #3e4045;
    font-size: 0.95rem;
    padding: 0 12px 0 40px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    outline: none;

    &::placeholder {
        color: #9ca3af;
    }

    &:focus {
        border-color: #14b8a6;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
    }

    &[type="date"] {
        padding-left: 40px;
    }
`;

const Suggestions = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-top: 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    list-style: none;
    padding: 0;
`;

const SuggestionItem = styled.li`
    padding: 8px 12px;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover {
        background: #f3f4f6;
    }
`;

const SelectWrap = styled.div`
    position: relative;

    svg {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: #9ca3af;
    }

    &::after {
        content: "";
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #6b7280;
        pointer-events: none;
    }
`;

const Select = styled.select`
    display: block;
    width: 100%;
    height: 44px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #fff;
    color: #111827;
    font-size: 0.95rem;
    padding: 0 30px 0 40px;
    outline: none;
    appearance: none;
    cursor: pointer;

    &:focus {
        border-color: #14b8a6;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
    }
`;

const Submit = styled.button`
    display: block;
    width: 50%;
    height: 48px;
    border: 0;
    border-radius: 10px;
    background: #14b8a6;
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    margin: 0 auto;
    margin-top: 18px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:hover {
        background: #0f766e;
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.3);
    }
`;

export default function SearchForm() {
    const { cities } = useCities("Bulgaria");
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [showDep, setShowDep] = useState(false);
    const [showDest, setShowDest] = useState(false);

    const filterCities = (input: string) =>
        input.length > 0
            ? cities
                  .filter((c) => c.toLowerCase().includes(input.toLowerCase()))
                  .slice(0, 10)
            : [];

    return (
        <Card>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Row>
                    <Group>
                        <Label htmlFor="departure">Leaving From</Label>
                        <FieldWrap>
                            <MapPin
                                style={{
                                    position: "absolute",
                                    left: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#9ca3af",
                                }}
                            />
                            <Input
                                id="departure"
                                type="text"
                                placeholder="Enter departure city"
                                value={departure}
                                onChange={(e) => {
                                    setDeparture(e.target.value);
                                    setShowDep(true);
                                }}
                                onBlur={() =>
                                    setTimeout(() => setShowDep(false), 200)
                                }
                                onFocus={() => setShowDep(true)}
                            />
                            {showDep && filterCities(departure).length > 0 && (
                                <Suggestions>
                                    {filterCities(departure).map((city) => (
                                        <SuggestionItem
                                            key={city}
                                            onClick={() => {
                                                setDeparture(city);
                                                setShowDep(false);
                                            }}
                                        >
                                            {city}
                                        </SuggestionItem>
                                    ))}
                                </Suggestions>
                            )}
                        </FieldWrap>
                    </Group>

                    <Group>
                        <Label htmlFor="destination">Going To</Label>
                        <FieldWrap>
                            <MapPin
                                style={{
                                    position: "absolute",
                                    left: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#9ca3af",
                                }}
                            />
                            <Input
                                id="destination"
                                type="text"
                                placeholder="Enter destination city"
                                value={destination}
                                onChange={(e) => {
                                    setDestination(e.target.value);
                                    setShowDest(true);
                                }}
                                onBlur={() =>
                                    setTimeout(() => setShowDest(false), 200)
                                }
                                onFocus={() => setShowDest(true)}
                            />
                            {showDest &&
                                filterCities(destination).length > 0 && (
                                    <Suggestions>
                                        {filterCities(destination).map(
                                            (city) => (
                                                <SuggestionItem
                                                    key={city}
                                                    onClick={() => {
                                                        setDestination(city);
                                                        setShowDest(false);
                                                    }}
                                                >
                                                    {city}
                                                </SuggestionItem>
                                            )
                                        )}
                                    </Suggestions>
                                )}
                        </FieldWrap>
                    </Group>
                </Row>

                <Row>
                    <Group>
                        <Label htmlFor="date">Departure Date</Label>
                        <FieldWrap>
                            <Calendar
                                style={{
                                    position: "absolute",
                                    left: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#9ca3af",
                                }}
                            />
                            <Input id="date" type="date" />
                        </FieldWrap>
                    </Group>

                    <Group>
                        <Label htmlFor="passengers">Number of Passengers</Label>
                        <SelectWrap>
                            <Users />
                            <Select id="passengers" defaultValue="1">
                                <option value="1">1 passenger</option>
                                <option value="2">2 passengers</option>
                                <option value="3">3 passengers</option>
                                <option value="4">4 passengers</option>
                            </Select>
                        </SelectWrap>
                    </Group>
                </Row>

                <Submit type="submit">
                    <Search size={18} />
                    Search Rides
                </Submit>
            </Form>
        </Card>
    );
}
