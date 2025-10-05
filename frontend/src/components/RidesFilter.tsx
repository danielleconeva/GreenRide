import { useMemo, useEffect } from "react";
import styled from "styled-components";
import { ChevronDown, Filter } from "lucide-react";
import type { Ride } from "../types/ride";
import type { ActiveFilters } from "../pages/RidesPage";

const Wrap = styled.aside`
    position: sticky;
    top: 16px;
    align-self: start;

    @media (max-width: 900px) {
        position: static;
        top: auto;
        align-self: auto;
    }
`;

const Card = styled.div`
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    margin: 0 0 20px;
    font-size: 1.4rem;
    font-weight: 600;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Group = styled.div`
    & + & {
        margin-top: 24px;
    }
`;

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    color: #374151;
    font-size: 0.95rem;
`;

const SelectWrap = styled.div`
    position: relative;
    svg {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #6b7280;
        pointer-events: none;
    }
`;

const Select = styled.select`
    width: 100%;
    height: 46px;
    border-radius: 12px;
    border: 1px solid #d1d5db;
    background: #fff;
    padding: 0 36px 0 14px;
    font-size: 1rem;
    outline: none;
    appearance: none;
    color: #374151;

    &:focus {
        border-color: #14b8a6;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
    }
`;

const RangeContainer = styled.div`
    padding: 0 4px;
`;

const Range = styled.input.attrs({ type: "range" })`
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #e5e7eb;
    outline: none;
    appearance: none;
    cursor: pointer;

    &::-webkit-slider-runnable-track {
        height: 6px;
        border-radius: 3px;
        background: transparent;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #14b8a6;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 3px solid #fff;

        margin-top: -7px;
    }

    &::-moz-range-track {
        height: 6px;
        border-radius: 3px;
        background: transparent;
    }

    &::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #14b8a6;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 3px solid #fff;
    }
`;

const RangeLabels = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 0.75rem;
    color: #6b7280;
`;

const CheckboxGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Check = styled.label`
    display: flex;
    align-items: center;
    gap: 12px;
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 400;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
        color: #438284;
    }

    input {
        width: 18px;
        height: 18px;
        border-radius: 6px;
        border: 1.5px solid #e2e8f0;
        accent-color: #1f978d;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            border-color: #cbd5e1;
        }

        &:focus-visible {
            outline: none;
            border-color: #198c82;
            box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
        }

        &:checked {
            border-color: #1d988e;
        }
    }
`;
type ResultsFilterProps = {
    data?: Ride[];
    activeFilters: ActiveFilters;
    setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters>>;
    maxPrice: number | null;
    setMaxPrice: React.Dispatch<React.SetStateAction<number | null>>;
    sortBy: "departure" | "priceAsc" | "priceDesc" | "seatsDesc";
    setSortBy: React.Dispatch<
        React.SetStateAction<
            "departure" | "priceAsc" | "priceDesc" | "seatsDesc"
        >
    >;
};

export default function ResultsFilter({
    data = [],
    activeFilters,
    setActiveFilters,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
}: ResultsFilterProps) {
    const MIN = 0;
    const MAX =
        data.length > 0
            ? Math.max(...data.map((ride) => ride.pricePerSeat))
            : 0;

    useEffect(() => {
        if (MAX > 0 && (!maxPrice || maxPrice > MAX)) {
            setMaxPrice(MAX);
        }
    }, [MAX, maxPrice, setMaxPrice]);

    const percent = useMemo(
        () => ((Number(maxPrice) - MIN) / (MAX - MIN || 1)) * 100,
        [maxPrice, MAX]
    );

    const trackBg = useMemo(
        () =>
            `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`,
        [percent]
    );

    return (
        <Wrap>
            <Card>
                <Title>
                    <Filter size={18} />
                    Filters
                </Title>

                <Group>
                    <Label>Sort by</Label>
                    <SelectWrap>
                        <Select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(
                                    e.target.value as
                                        | "departure"
                                        | "priceAsc"
                                        | "priceDesc"
                                        | "seatsDesc"
                                )
                            }
                        >
                            <option value="departure">Departure Time</option>
                            <option value="priceAsc">Price (low → high)</option>
                            <option value="priceDesc">
                                Price (high → low)
                            </option>
                            <option value="seatsDesc">Seats available</option>
                        </Select>
                        <ChevronDown size={16} />
                    </SelectWrap>
                </Group>

                <Group>
                    <Label>Price Range (Up to €{maxPrice ?? 0})</Label>
                    <RangeContainer>
                        <Range
                            min={MIN}
                            max={MAX}
                            value={maxPrice ?? MAX}
                            onChange={(e) =>
                                setMaxPrice(Number(e.target.value))
                            }
                            style={{ background: trackBg }}
                            aria-label="Max price"
                        />
                        <RangeLabels>
                            <span>€{MIN}</span>
                            <span>€{MAX}</span>
                        </RangeLabels>
                    </RangeContainer>
                </Group>

                <Group>
                    <Label>Amenities</Label>
                    <CheckboxGroup>
                        <Check>
                            <input
                                type="checkbox"
                                checked={activeFilters.airConditioning}
                                onChange={() =>
                                    setActiveFilters((prev) => ({
                                        ...prev,
                                        airConditioning: !prev.airConditioning,
                                    }))
                                }
                            />
                            Air Conditioning
                        </Check>
                        <Check>
                            <input
                                type="checkbox"
                                checked={activeFilters.music}
                                onChange={() =>
                                    setActiveFilters((prev) => ({
                                        ...prev,
                                        music: !prev.music,
                                    }))
                                }
                            />
                            Music
                        </Check>
                        <Check>
                            <input
                                type="checkbox"
                                checked={activeFilters.smokingAllowed}
                                onChange={() =>
                                    setActiveFilters((prev) => ({
                                        ...prev,
                                        smokingAllowed: !prev.smokingAllowed,
                                    }))
                                }
                            />
                            Smoking Allowed
                        </Check>
                        <Check>
                            <input
                                type="checkbox"
                                checked={activeFilters.petsAllowed}
                                onChange={() =>
                                    setActiveFilters((prev) => ({
                                        ...prev,
                                        petsAllowed: !prev.petsAllowed,
                                    }))
                                }
                            />
                            Pets Allowed
                        </Check>
                    </CheckboxGroup>
                </Group>
            </Card>
        </Wrap>
    );
}
