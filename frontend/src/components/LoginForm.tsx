import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { LoginErrors, LoginTouched } from "../hooks/useLoginForm";

const FormWrapper = styled.form`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 400px;
    padding: 2rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.09);

    h3 {
        color: ${({ theme }) => theme.colors.foreground};
        font-size: 1.8rem;
        margin: 0 auto;
    }

    label {
        font-size: 0.9rem;
        font-weight: 500;
        margin: 0.5rem 0;
    }
    input {
        background: #f5f5f5;
        border: 1px solid #ddd;
    }

    button {
        padding: 0.75rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        background: ${({ theme }) => theme.colors.gradientHero};
        color: ${({ theme }) => theme.colors.primaryForeground};
        transition: opacity 0.2s ease;
        width: 40%;
        margin: 0.9rem auto 0;

        &:hover {
            transform: translateY(-1px) scale(1.02);
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
        }
        &:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    }

    p {
        text-align: center;
        font-size: 0.9rem;
    }
`;

const InputGroup = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    input {
        width: 100%;
        padding: 0.75rem 2.5rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;

        &:focus {
            outline: none;
            border-color: ${({ theme }) => theme.colors.primary};
            box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
        }
    }

    svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #6b7280;
        z-index: 1;
    }
    .left-icon {
        left: 0.75rem;
    }
    .right-icon {
        right: 0.75rem;
        cursor: pointer;
    }
`;

const ValidationError = styled.span`
    color: #e63946;
    font-size: 0.85rem;
    display: block;
    transition: opacity 0.2s ease;
`;

const SignupLink = styled(Link)`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.primaryDark};
        text-decoration: underline;
    }
`;

type Props = {
    email: string;
    password: string;
    showPassword: boolean;
    loading: boolean;
    serverError?: string | null;
    touched: LoginTouched;
    errors: LoginErrors;
    onChange: (field: "email" | "password", value: string) => void;
    onBlur: (field: "email" | "password", value: string) => void;
    onToggleShowPassword: () => void;
    onSubmit: (e: React.FormEvent) => void;
};

export default function LoginForm({
    email,
    password,
    showPassword,
    loading,
    touched,
    errors,
    onChange,
    onBlur,
    onToggleShowPassword,
    onSubmit,
}: Props) {
    return (
        <FormWrapper onSubmit={onSubmit}>
            <h3>Log In</h3>
            <p>Use your email and password to continue</p>

            <label htmlFor="email">Email</label>
            <InputGroup>
                <Mail className="left-icon" size={18} />
                <input
                    type="text"
                    id="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => onChange("email", e.target.value)}
                    onBlur={(e) => onBlur("email", e.target.value)}
                />
            </InputGroup>
            {touched.email && errors.email && (
                <ValidationError>{errors.email}</ValidationError>
            )}

            <label htmlFor="password">Password</label>
            <InputGroup>
                <Lock className="left-icon" size={18} />
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => onChange("password", e.target.value)}
                    onBlur={(e) => onBlur("password", e.target.value)}
                />
                {showPassword ? (
                    <EyeOff
                        className="right-icon"
                        size={18}
                        onClick={onToggleShowPassword}
                    />
                ) : (
                    <Eye
                        className="right-icon"
                        size={18}
                        onClick={onToggleShowPassword}
                    />
                )}
            </InputGroup>
            {touched.password && errors.password && (
                <ValidationError>{errors.password}</ValidationError>
            )}

            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
            </button>

            <p>
                Don't have an account?{" "}
                <SignupLink to="/register">Sign up</SignupLink>
            </p>
        </FormWrapper>
    );
}
