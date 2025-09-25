import { Leaf } from "lucide-react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useState } from "react";
import { login } from "../store/authSlice";
import { Link } from "react-router-dom";

const LeafIcon = styled(Leaf)`
    background: ${({ theme }) => theme.colors.gradientHero};
    padding: 0.8rem;
    border-radius: 50%;
    color: white;
`;

const Wrapper = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    gap: 1rem;
`;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: 380px;
    padding: 2rem;
    border-radius: 1rem;

    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    h3 {
        color: ${({ theme }) => theme.colors.foreground};
        margin: 0 auto;
    }

    label {
        font-size: 0.9rem;
        font-weight: 500;
    }

    input {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        font-size: 1rem;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;

        &:focus {
            outline: none;
            border-color: ${({ theme }) => theme.colors.primary};
            box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
        }
    }

    button {
        padding: 0.75rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primaryForeground};
        transition: background 0.2s ease;
        width: 50%;
        margin: 1.5rem auto;

        &:hover {
            background: ${({ theme }) => theme.colors.primaryDark};
        }
    }

    p {
        text-align: center;
        font-size: 0.9rem;
    }
`;

const ValidationError = styled.span`
    color: #e63946;
    font-size: 0.85rem;
    margin-top: -0.25rem;
    margin-bottom: 0.5rem;
    display: block;
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

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error: serverError } = useSelector(
        (state: RootState) => state.auth
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );

    function validateField(field: string, value: string) {
        let error = "";
        if (field === "email" && !value.includes("@")) {
            error = "Please enter a valid email address.";
        }
        if (field === "password" && value.length < 6) {
            error = "Password must be at least 6 characters.";
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setErrors({
                email: !email ? "Email is required." : errors.email,
                password: !password ? "Password is required." : errors.password,
            });
            return;
        }

        if (errors.email || errors.password) return;

        dispatch(login({ email, password }));
    };

    return (
        <Wrapper>
            <LeafIcon size={30} />
            <h1>Welcome Back</h1>
            <p>Log in to continue your eco-friendly journey</p>
            <FormWrapper onSubmit={handleSubmit}>
                <h3>Log In</h3>
                <p>Use your email and password to continue</p>

                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => validateField("email", e.target.value)}
                />
                {errors.email && (
                    <ValidationError>{errors.email}</ValidationError>
                )}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => validateField("password", e.target.value)}
                />
                {errors.password && (
                    <ValidationError>{errors.password}</ValidationError>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Log In"}
                </button>
                {serverError && (
                    <ValidationError>{serverError}</ValidationError>
                )}

                <p>
                    Don't have an account?{" "}
                    <SignupLink to="/register">Sign up</SignupLink>
                </p>
            </FormWrapper>
        </Wrapper>
    );
}
