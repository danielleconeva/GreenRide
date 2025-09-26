// PublishForm.tsx
import styled from "styled-components";
import { useState } from "react";
import { CityInput } from "./CityInput"; // Make sure this points to your updated CityInput
import { MapPin, Car, Cigarette, Snowflake, Dog, Music } from "lucide-react";

/* --- Base styles --- */
const Form = styled.form`
    max-width: 980px;
    margin: 2rem auto 4rem;
    padding: 0 1rem;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif;
`;

const FieldsetCard = styled.fieldset`
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 2rem;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
`;

const Legend = styled.legend`
    font-size: 1.5rem;
    font-weight: 600;
    color: #222a36;
    padding: 0 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const FlexRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    & > * {
        flex: 1;
        min-width: 200px;
    }
`;

const Group = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
`;

const Input = styled.input`
    height: 48px;
    padding: 0 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    color: #4e4f54;
    font-size: 0.95rem;
    padding: 0 12px 0 40px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    background: #fff;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus {
        outline: none;
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }

    &::placeholder {
        color: #9ca3af;
    }
`;

const Select = styled.select`
    height: 48px;
    padding: 0 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: #fff;
    font-size: 0.875rem;
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus {
        outline: none;
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
`;

const Textarea = styled.textarea`
    min-height: 120px;
    padding: 16px;
    border: 1px solid #d1d5db;
    border-radius: 20px;
    font-size: 0.9rem;
    resize: vertical;
    font-family: inherit;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    margin-bottom: 1rem;

    &:focus {
        outline: none;
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }

    &::placeholder {
        color: #9ca3af;
    }
`;

const Submit = styled.button`
    width: 30%;
    height: 48px;
    border: 0;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background: #14b8a6;
    cursor: pointer;
    transition: background-color 0.15s ease, transform 0.12s ease,
        box-shadow 0.12s ease; /* + box-shadow */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 18px auto 0;
    will-change: transform, box-shadow; /* perf hint */
    transform: translateZ(0); /* avoid blur on macOS */

    &:hover {
        background: #0f766e; /* keep your existing hover color */
        transform: translateY(-1px); /* subtle lift */
        box-shadow: 0 8px 18px rgba(20, 184, 166, 0.25); /* soft shadow */
    }

    &:active {
        outline: none;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.3);
        transform: translateY(1px);
    }
`;

const PriceHelperText = styled.p`
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 0.5rem;
`;

/* --- Amenities layout --- */
const AmenityGrid = styled.div`
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;

    @media (max-width: 800px) {
        flex-direction: column;
        gap: 1rem;
    }
`;

const AmenityItem = styled.label`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.15s ease;
`;

const AmenityCheckbox = styled.input.attrs({ type: "checkbox" })`
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: #14b8a6;
    cursor: pointer;
`;

const AmenityLabel = styled.span`
    font-size: 0.875rem;
    color: #374151;
    font-weight: 500;
    white-space: nowrap;
`;

const AmenityIconWrapper = styled.span`
    display: flex;
    align-items: center;
    color: #374151;
    font-size: 14px;
`;

/* --- Component --- */
export default function PublishForm() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Example: const data = Object.fromEntries(new FormData(e.currentTarget) as any);
        // send to API...
    }

    return (
        <Form onSubmit={handleSubmit}>
            {/* 1) Trip Details */}
            <FieldsetCard>
                <Legend>
                    <MapPin size={20} />
                    Trip Details
                </Legend>

                <FlexRow>
                    <Group>
                        <Label htmlFor="from">Starting Point</Label>
                        <CityInput
                            id="from"
                            name="from"
                            placeholder="Enter departure city or address"
                            value={from}
                            onChange={setFrom}
                            $variant="publish"
                        />
                    </Group>

                    <Group>
                        <Label htmlFor="to">Destination</Label>
                        <CityInput
                            id="to"
                            name="to"
                            placeholder="Enter destination city or address"
                            value={to}
                            onChange={setTo}
                            $variant="publish"
                        />
                    </Group>
                </FlexRow>

                <FlexRow>
                    <Group>
                        <Label htmlFor="departureDate">Departure Date</Label>
                        <Input
                            id="departureDate"
                            name="departureDate"
                            type="date"
                            placeholder="Pick a date"
                        />
                    </Group>

                    <Group>
                        <Label htmlFor="departureTime">Departure Time</Label>
                        <Input
                            id="departureTime"
                            name="departureTime"
                            type="time"
                            defaultValue="12:30"
                        />
                    </Group>

                    <Group>
                        <Label htmlFor="availableSeats">Available Seats</Label>
                        <Select
                            id="availableSeats"
                            name="availableSeats"
                            defaultValue="1"
                        >
                            <option value="1">👤 1 seat</option>
                            <option value="2">👤 2 seats</option>
                            <option value="3">👤 3 seats</option>
                            <option value="4">👤 4 seats</option>
                            <option value="5">👤 5 seats</option>
                        </Select>
                    </Group>
                </FlexRow>

                <FlexRow>
                    <Group>
                        <Label htmlFor="pricePerSeat">Price per seat</Label>
                        <Input
                            id="pricePerSeat"
                            name="pricePerSeat"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Enter price per seat"
                        />
                        <PriceHelperText>
                            Set the amount each passenger pays for one seat.
                        </PriceHelperText>
                    </Group>
                </FlexRow>
            </FieldsetCard>

            {/* 2) Car Information */}
            <FieldsetCard>
                <Legend>
                    <Car size={20} />
                    Car Information
                </Legend>

                <FlexRow>
                    <Group>
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                            id="brand"
                            name="brand"
                            placeholder="e.g., Toyota"
                        />
                    </Group>

                    <Group>
                        <Label htmlFor="model">Model</Label>
                        <Input
                            id="model"
                            name="model"
                            placeholder="e.g., Camry"
                        />
                    </Group>

                    <Group>
                        <Label htmlFor="color">Color</Label>
                        <Input
                            id="color"
                            name="color"
                            placeholder="e.g., Blue"
                        />
                    </Group>

                    <Group>
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" name="year" placeholder="e.g., 2020" />
                    </Group>
                </FlexRow>
            </FieldsetCard>

            {/* 3) Amenities & Preferences */}
            <FieldsetCard>
                <Legend>Amenities & Preferences</Legend>

                <AmenityGrid>
                    <AmenityItem>
                        <AmenityCheckbox
                            id="amenity-smokingAllowed"
                            name="amenities[smokingAllowed]"
                        />
                        <AmenityIconWrapper>
                            <Cigarette size={16} />
                        </AmenityIconWrapper>
                        <AmenityLabel>Smoking allowed</AmenityLabel>
                    </AmenityItem>

                    <AmenityItem>
                        <AmenityCheckbox
                            id="amenity-airConditioning"
                            name="amenities[airConditioning]"
                        />
                        <AmenityIconWrapper>
                            <Snowflake size={16} />
                        </AmenityIconWrapper>
                        <AmenityLabel>Air Conditioning</AmenityLabel>
                    </AmenityItem>

                    <AmenityItem>
                        <AmenityCheckbox
                            id="amenity-petsAllowed"
                            name="amenities[petsAllowed]"
                        />
                        <AmenityIconWrapper>
                            <Dog size={16} />
                        </AmenityIconWrapper>
                        <AmenityLabel>Pets allowed</AmenityLabel>
                    </AmenityItem>

                    <AmenityItem>
                        <AmenityCheckbox
                            id="amenity-music"
                            name="amenities[music]"
                        />
                        <AmenityIconWrapper>
                            <Music size={16} />
                        </AmenityIconWrapper>
                        <AmenityLabel>Music</AmenityLabel>
                    </AmenityItem>
                </AmenityGrid>

                <Group>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                        id="notes"
                        name="notes"
                        placeholder="e.g., Meeting point in front of metro station, happy to help with luggage..."
                    />
                </Group>
            </FieldsetCard>

            <Submit type="submit">+ Publish a Ride</Submit>
        </Form>
    );
}
