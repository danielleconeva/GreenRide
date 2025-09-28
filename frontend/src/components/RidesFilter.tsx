import { useMemo, useState } from "react";
import styled from "styled-components";
import { ChevronDown, Filter } from "lucide-react";

const Wrap = styled.aside`
    position: sticky;
    top: 16px;
    align-self: start;
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

// replace ONLY the Range styled component with this:
const Range = styled.input.attrs({ type: "range" })`
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #e5e7eb; /* gets overridden by your inline gradient */
    outline: none;
    appearance: none;
    cursor: pointer;

    /* WebKit track */
    &::-webkit-slider-runnable-track {
        height: 6px;
        border-radius: 3px;
        background: transparent;
    }

    /* WebKit thumb */
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
        /* centers the 20px thumb on a 6px track: (20-6)/2 = 7 */
        margin-top: -7px;
    }

    /* Firefox track */
    &::-moz-range-track {
        height: 6px;
        border-radius: 3px;
        background: transparent;
    }

    /* Firefox thumb */
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
    color: #4b5563;
    font-size: 0.95rem;
    cursor: pointer;

    input {
        width: 16px;
        height: 16px;
        border-radius: 4px;
        border: 1px solid #d1d5db;
        accent-color: #14b8a6;
        cursor: pointer;

        &:focus {
            outline: 2px solid #14b8a6;
            outline-offset: 2px;
        }
    }
`;

export default function ResultsFilter() {
    const MIN = 0;
    const MAX = 200;
    const [maxPrice, setMaxPrice] = useState(100);

    const percent = useMemo(
        () => ((maxPrice - MIN) / (MAX - MIN)) * 100,
        [maxPrice]
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
                        <Select defaultValue="departure">
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
                    <Label>Price Range (Up to €{maxPrice})</Label>
                    <RangeContainer>
                        <Range
                            min={MIN}
                            max={MAX}
                            value={maxPrice}
                            onChange={(e) =>
                                setMaxPrice(Number(e.target.value))
                            }
                            onInput={(e) =>
                                setMaxPrice(
                                    Number((e.target as HTMLInputElement).value)
                                )
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
                            <input type="checkbox" />
                            Air Conditioning
                        </Check>
                        <Check>
                            <input type="checkbox" />
                            Music Allowed
                        </Check>
                        <Check>
                            <input type="checkbox" />
                            Non-Smoking
                        </Check>
                        <Check>
                            <input type="checkbox" />
                            Pets Allowed
                        </Check>
                    </CheckboxGroup>
                </Group>
            </Card>
        </Wrap>
    );
}
