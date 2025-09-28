import styled from "styled-components";
import { Edit3 } from "lucide-react";

const Card = styled.section`
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 25px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Field = styled.div`
    margin-bottom: 16px;
`;

const Label = styled.label`
    font-size: 0.85rem;
    font-weight: 600;
    color: #6b7280;
    margin: 1rem 0;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    height: 44px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    padding: 0 12px;
    background: #fff;
    color: #555758;
    font-weight: 500;
    font-size: 0.95rem;
    margin-bottom: 0.8rem;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fonts.body};

    &:focus {
        outline: none;
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    min-height: 96px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    padding: 12px;
    resize: vertical;
    color: #1f2937;
    font-weight: 500;
    font-size: 0.95rem;
    margin-bottom: 0.6rem;
    box-sizing: border-box;

    &::placeholder {
        font-family: ${({ theme }) => theme.fonts.body};
    }

    &:focus {
        outline: none;
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
`;

const Helper = styled.div`
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 500;
`;

export type BookingDetailsState = {
    passengers: number;
    note: string;
};

type Props = {
    value: BookingDetailsState;
    maxPassengers: number;
    onChange: (next: BookingDetailsState) => void;
};

export default function BookingDetails({
    value,
    maxPassengers,
    onChange,
}: Props) {
    const options = Array.from({ length: maxPassengers }, (_, i) => i + 1);

    return (
        <Card aria-labelledby="booking-details-title">
            <Title id="booking-details-title">
                <Edit3 size={18} />
                Booking Details
            </Title>
            <Field>
                <Label htmlFor="passengers">Number of Passengers</Label>
                <Select
                    id="passengers"
                    value={value.passengers}
                    onChange={(e) =>
                        onChange({
                            ...value,
                            passengers: Number(e.target.value),
                        })
                    }
                >
                    {options.map((n) => (
                        <option key={n} value={n}>
                            {n} {n === 1 ? "passenger" : "passengers"}
                        </option>
                    ))}
                </Select>
            </Field>
            <Field>
                <Label htmlFor="note">Note to Driver (Optional)</Label>
                <Textarea
                    id="note"
                    placeholder="e.g., I'll bring a small pet. Can we meet near the metro entrance?"
                    value={value.note}
                    onChange={(e) =>
                        onChange({ ...value, note: e.target.value })
                    }
                />
                <Helper>
                    Sharing helpful details keeps everyone on the same page.
                </Helper>
            </Field>
        </Card>
    );
}
