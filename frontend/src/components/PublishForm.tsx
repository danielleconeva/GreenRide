import styled from "styled-components";
import { useState } from "react";
import { CityInput } from "./CityInput";
import { MapPin, Cigarette, Snowflake, Dog, Music } from "lucide-react";
import type { NewRide, Ride } from "../types/ride";

const Form = styled.form`
    max-width: 980px;
    margin: 2rem auto 4rem;
    padding: 0 1rem;
    font-family: ${({ theme }) => theme.fonts.body};
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
    border: 1px solid #d1d5db;
    border-radius: 8px;
    color: #4e4f54;
    font-size: 0.95rem;
    padding: 0 12px 0 40px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    background: #fff;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    font-family: ${({ theme }) => theme.fonts.body};

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
    font-size: 0.9rem;
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    font-family: ${({ theme }) => theme.fonts.body};

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
        box-shadow 0.12s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 18px auto 0;
    will-change: transform, box-shadow;
    transform: translateZ(0);

    &:hover {
        background: #22a499;
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
    }

    &:active {
        transform: translateY(0) scale(0.98);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.3);
    }

    &:disabled {
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

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

function minutesBetween(depTime: string, arrTime: string): number {
    if (!depTime || !arrTime) return 0;
    const [dh, dm] = depTime.split(":").map(Number);
    const [ah, am] = arrTime.split(":").map(Number);
    const dep = dh * 60 + dm;
    let arr = ah * 60 + am;
    if (arr < dep) arr += 24 * 60;
    return arr - dep;
}

function formatDate(dateStr?: string) {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    return dateStr.split("T")[0];
}

function formatTime(timeStr?: string) {
    if (!timeStr) return "";
    if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;
    try {
        const d = new Date(timeStr);
        return d.toISOString().substring(11, 16);
    } catch {
        return "";
    }
}
type PublishFormProps = {
    onSubmit: (values: NewRide) => void;
    submitting?: boolean;
    serverError?: string;
    createdRide?: Ride | null;
    initialValues?: Partial<Ride>;
};

export default function PublishForm({
    onSubmit,
    submitting,
    serverError,
    createdRide,
    initialValues = {},
}: PublishFormProps) {
    const [from, setFrom] = useState(initialValues.from || "");
    const [to, setTo] = useState(initialValues.to || "");
    const [departureDate, setDepartureDate] = useState(
        formatDate(initialValues.departureDate)
    );
    const [departureTime, setDepartureTime] = useState(
        formatTime(initialValues.departureTime)
    );
    const [arrivalTime, setArrivalTime] = useState(
        formatTime(initialValues.arrivalTime)
    );
    const [pricePerSeat, setPricePerSeat] = useState(
        initialValues.pricePerSeat?.toString() || ""
    );

    const isFormValid = !!(
        from.trim() &&
        to.trim() &&
        departureDate &&
        departureTime &&
        arrivalTime &&
        pricePerSeat
    );

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);

        const getStr = (name: string) =>
            typeof fd.get(name) === "string" ? (fd.get(name) as string) : "";
        const getNum = (name: string, fallback = 0) => {
            const raw = fd.get(name);
            if (raw === null) return fallback;
            const n = Number(raw);
            return Number.isFinite(n) ? n : fallback;
        };

        const durationMin = minutesBetween(departureTime, arrivalTime);
        const notes = getStr("notes").trim();

        const values: NewRide = {
            from,
            to,
            departureDate,
            departureTime,
            arrivalTime,
            durationMin,
            pricePerSeat: Number(pricePerSeat) || 0,
            seatsAvailable: getNum("seatsAvailable", 1),
            amenities: {
                smokingAllowed: Boolean(fd.get("amenities.smokingAllowed")),
                airConditioning: Boolean(fd.get("amenities.airConditioning")),
                petsAllowed: Boolean(fd.get("amenities.petsAllowed")),
                music: Boolean(fd.get("amenities.music")),
            },
            ...(notes ? { notes } : {}),
        };

        onSubmit(values);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FieldsetCard>
                <Legend>
                    <MapPin size={20} />
                    Trip Details
                </Legend>

                <FlexRow>
                    <Group>
                        <Label htmlFor="from">Starting Point *</Label>
                        <CityInput
                            id="from"
                            name="from"
                            placeholder="Enter departure city"
                            value={from}
                            onChange={setFrom}
                            $variant="publish"
                        />
                    </Group>

                    <Group>
                        <Label htmlFor="to">Destination *</Label>
                        <CityInput
                            id="to"
                            name="to"
                            placeholder="Enter destination city"
                            value={to}
                            onChange={setTo}
                            $variant="publish"
                        />
                    </Group>
                </FlexRow>

                <FlexRow>
                    <Group>
                        <Label htmlFor="departureDate">Departure Date *</Label>
                        <Input
                            id="departureDate"
                            name="departureDate"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                        />
                    </Group>

                    <Group>
                        <Label htmlFor="departureTime">Departure Time *</Label>
                        <Input
                            id="departureTime"
                            name="departureTime"
                            type="time"
                            value={departureTime}
                            onChange={(e) => setDepartureTime(e.target.value)}
                        />
                    </Group>

                    <Group>
                        <Label htmlFor="arrivalTime">Arrival Time *</Label>
                        <Input
                            id="arrivalTime"
                            name="arrivalTime"
                            type="time"
                            value={arrivalTime}
                            onChange={(e) => setArrivalTime(e.target.value)}
                        />
                    </Group>
                </FlexRow>

                <FlexRow>
                    <Group>
                        <Label htmlFor="seatsAvailable">Available Seats</Label>
                        <Select
                            id="seatsAvailable"
                            name="seatsAvailable"
                            defaultValue={String(
                                initialValues.seatsAvailable || 1
                            )}
                        >
                            {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                    {n} seat{n > 1 ? "s" : ""}
                                </option>
                            ))}
                        </Select>
                    </Group>

                    <Group>
                        <Label htmlFor="pricePerSeat">Price per seat *</Label>
                        <Input
                            id="pricePerSeat"
                            name="pricePerSeat"
                            type="text"
                            inputMode="numeric"
                            placeholder="Enter price per seat"
                            value={pricePerSeat}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );
                                setPricePerSeat(onlyNums);
                            }}
                        />
                    </Group>
                </FlexRow>
            </FieldsetCard>

            <FieldsetCard>
                <Legend>Amenities & Preferences</Legend>
                <AmenityGrid>
                    <AmenityItem>
                        <AmenityCheckbox
                            id="amenities.smokingAllowed"
                            name="amenities.smokingAllowed"
                            defaultChecked={
                                initialValues.amenities?.smokingAllowed
                            }
                        />
                        <AmenityIconWrapper>
                            <Cigarette size={16} />
                        </AmenityIconWrapper>
                        <AmenityLabel>Smoking allowed</AmenityLabel>
                    </AmenityItem>

                    <AmenityItem>
                        <AmenityCheckbox
                            id="amenities.airConditioning"
                            name="amenities.airConditioning"
                            defaultChecked={
                                initialValues.amenities?.airConditioning
                            }
                        />
                        <AmenityIconWrapper>
                            <Snowflake size={16} />
                        </AmenityIconWrapper>
                        <AmenityLabel>Air Conditioning</AmenityLabel>
                    </AmenityItem>

                    <AmenityItem>
                        <AmenityCheckbox
                            id="amenities.petsAllowed"
                            name="amenities.petsAllowed"
                            defaultChecked={
                                initialValues.amenities?.petsAllowed
                            }
                        />
                        <AmenityIconWrapper>
                            <Dog size={16} />
                        </AmenityIconWrapper>
                        <AmenityLabel>Pets allowed</AmenityLabel>
                    </AmenityItem>

                    <AmenityItem>
                        <AmenityCheckbox
                            id="amenities.music"
                            name="amenities.music"
                            defaultChecked={initialValues.amenities?.music}
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
                        placeholder="e.g., Meeting point at metro station..."
                        defaultValue={initialValues.notes}
                    />
                </Group>
            </FieldsetCard>

            <Submit type="submit" disabled={submitting || !isFormValid}>
                {submitting
                    ? "Saving…"
                    : initialValues._id
                    ? "Save Changes"
                    : "+ Publish a Ride"}
            </Submit>

            {serverError && (
                <p
                    style={{
                        color: "crimson",
                        marginTop: ".75rem",
                        textAlign: "center",
                    }}
                >
                    {serverError}
                </p>
            )}
        </Form>
    );
}
