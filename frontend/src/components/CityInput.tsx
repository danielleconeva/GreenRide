// CityInput.tsx
import { useState } from "react";
import styled from "styled-components";
import { MapPin } from "lucide-react";
import { useCities } from "../hooks/useCtities";

const Wrapper = styled.div`
    position: relative;
`;

const Input = styled.input<{ $variant?: "default" | "publish" }>`
    width: ${(props) => (props.$variant === "publish" ? "80%" : "100%")};
    height: ${(props) => (props.$variant === "publish" ? "48px" : "44px")};
    border-radius: 8px;
    border: 1px solid #d1d5db;
    padding: ${(props) =>
        props.$variant === "publish" ? "0 16px 0 40px" : "0 12px 0 40px"};
    font-size: ${(props) =>
        props.$variant === "publish" ? "0.875rem" : "0.95rem"};
    outline: none;
    color: #111827;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus {
        border-color: #14b8a6;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
    }

    &::placeholder {
        color: #9ca3af;
    }
`;

const Suggestions = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
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

const LeftIcon = styled.span`
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
`;

export function CityInput({
    id,
    name,
    placeholder,
    value,
    onChange,
    $variant = "default",
}: {
    id?: string;
    name?: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
    $variant?: "default" | "publish";
}) {
    const { cities, loading } = useCities("Bulgaria");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filtered =
        value.length > 0
            ? cities
                  .filter((c) => c.toLowerCase().includes(value.toLowerCase()))
                  .slice(0, 10)
            : [];

    return (
        <Wrapper>
            <LeftIcon>
                <MapPin />
            </LeftIcon>
            <Input
                $variant={$variant}
                id={id}
                name={name}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                autoComplete="off"
            />
            {showSuggestions && filtered.length > 0 && (
                <Suggestions>
                    {filtered.map((city) => (
                        <SuggestionItem
                            key={city}
                            onMouseDown={(e) => e.preventDefault()} // keep focus in input
                            onClick={() => {
                                onChange(city);
                                setShowSuggestions(false);
                            }}
                        >
                            {city}
                        </SuggestionItem>
                    ))}
                </Suggestions>
            )}
            {loading && <p style={{ fontSize: "0.8rem" }}>Loading cities…</p>}
        </Wrapper>
    );
}
