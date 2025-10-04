import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type {
    SignUpErrors,
    SignUpTouched,
    SignUpValues,
} from "../hooks/useSignUpForm";

const FormWrapper = styled.form`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 450px;
    padding: 2rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.09);

    h3 {
        font-size: 1.8rem;
        margin: 0 auto;
        color: ${({ theme }) => theme.colors.foreground};
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
`;

const SignupLink = styled(Link)`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    &:hover {
        color: ${({ theme }) => theme.colors.primaryDark};
        text-decoration: underline;
    }
`;

type Props = {
    values: SignUpValues;
    errors: SignUpErrors;
    touched: SignUpTouched;
    loading: boolean;
    serverError?: string | null;
    showPassword: boolean;
    showConfirmPassword: boolean;
    onChange: (field: keyof SignUpValues, value: string) => void;
    onBlur: (field: keyof SignUpTouched) => void;
    onToggleShowPassword: () => void;
    onToggleShowConfirm: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function SignUpForm({
    values,
    errors,
    touched,
    loading,
    serverError,
    showPassword,
    showConfirmPassword,
    onChange,
    onBlur,
    onToggleShowPassword,
    onToggleShowConfirm,
    onSubmit,
}: Props) {
    const { username, email, password, confirmPassword } = values;

    return (
        <FormWrapper onSubmit={onSubmit} noValidate>
            <h3>Create Account</h3>
            <p>Fill in your details to get started</p>

            <label htmlFor="username">Username</label>
            <InputGroup>
                <Leaf className="left-icon" size={18} />
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    placeholder="Enter your username"
                    onChange={(e) => onChange("username", e.target.value)}
                    onBlur={() => onBlur("username")}
                    autoComplete="username"
                />
            </InputGroup>
            {touched.username && errors.username && (
                <ValidationError>{errors.username}</ValidationError>
            )}

            <label htmlFor="email">Email</label>
            <InputGroup>
                <Mail className="left-icon" size={18} />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => onChange("email", e.target.value)}
                    onBlur={() => onBlur("email")}
                    autoComplete="email"
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
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => onChange("password", e.target.value)}
                    onBlur={() => onBlur("password")}
                    autoComplete="new-password"
                />
                {showPassword ? (
                    <EyeOff
                        className="right-icon"
                        size={18}
                        onClick={onToggleShowPassword}
                        aria-label="Hide password"
                        role="button"
                        tabIndex={0}
                    />
                ) : (
                    <Eye
                        className="right-icon"
                        size={18}
                        onClick={onToggleShowPassword}
                        aria-label="Show password"
                        role="button"
                        tabIndex={0}
                    />
                )}
            </InputGroup>
            {touched.password && errors.password && (
                <ValidationError>{errors.password}</ValidationError>
            )}

            <label htmlFor="confirmPassword">Confirm Password</label>
            <InputGroup>
                <Lock className="left-icon" size={18} />
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Re-enter your password"
                    onChange={(e) =>
                        onChange("confirmPassword", e.target.value)
                    }
                    onBlur={() => onBlur("confirmPassword")}
                    autoComplete="new-password"
                />
                {showConfirmPassword ? (
                    <EyeOff
                        className="right-icon"
                        size={18}
                        onClick={onToggleShowConfirm}
                        aria-label="Hide confirm password"
                        role="button"
                        tabIndex={0}
                    />
                ) : (
                    <Eye
                        className="right-icon"
                        size={18}
                        onClick={onToggleShowConfirm}
                        aria-label="Show confirm password"
                        role="button"
                        tabIndex={0}
                    />
                )}
            </InputGroup>
            {touched.confirmPassword && errors.confirmPassword && (
                <ValidationError>{errors.confirmPassword}</ValidationError>
            )}

            <button type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
            </button>

            {serverError && <ValidationError>{serverError}</ValidationError>}

            <p>
                Already have an account?{" "}
                <SignupLink to="/login">Log in</SignupLink>
            </p>
        </FormWrapper>
    );
}
