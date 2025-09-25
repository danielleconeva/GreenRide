import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useState } from "react";
import { login } from "../store/authSlice";
import { Link } from "react-router-dom";
import bubbleImage from "../assets/home-bubble-min.png";

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
    position: relative;
    background: ${({ theme }) => theme.colors.background};
    overflow: hidden;
`;

const BackgroundImageLeft = styled.img`
    position: absolute;
    bottom: 15px;
    left: -200px;
    width: 500px;
    height: auto;
    opacity: 0.4;
    z-index: 0;
    pointer-events: none;
    transform: rotate(240deg);
`;

const BackgroundImageRight = styled.img`
    position: absolute;
    top: 0;
    right: -260px;
    width: 500px;
    height: auto;
    opacity: 0.4;
    z-index: 0;
    pointer-events: none;
    transform: rotate(340deg);
`;

const FormContainer = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    max-width: 1000px;
    width: 100%;
    padding-bottom: 4rem;
    margin-right: 15rem;
`;

const IntroText = styled.div`
    flex: 1;
    text-align: left;
    padding-bottom: 5rem;
    margin-left: 3rem;

    h1 {
        margin-bottom: 0.5rem;
        color: #292727;
        font-size: 2.2rem;
        color: ${({ theme }) => theme.colors.foreground};
    }

    p {
        margin: 0;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.mutedForeground || "#555"};
    }
`;

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
        color: #292727;
    }

    label {
        font-size: 0.9rem;
        font-weight: 500;
        margin: 0.5rem 0 0.5rem 0;
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
        background: linear-gradient(
            90deg,
            ${({ theme }) => theme.colors.primary},
            ${({ theme }) => theme.colors.primaryDark}
        );
        color: ${({ theme }) => theme.colors.primaryForeground};
        background: ${({ theme }) => theme.colors.gradientHero};
        transition: opacity 0.2s ease;
        width: 40%;
        margin: 0 auto;
        margin-top: 0.9rem;

        &:hover {
            opacity: 0.9;
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
        padding: 0.75rem 2.5rem 0.75rem 2.5rem;
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
        pointer-events: none;
        z-index: 1;
    }

    .left-icon {
        left: 0.75rem;
    }

    .right-icon {
        right: 0.75rem;
        cursor: pointer;
        pointer-events: auto;
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

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error: serverError } = useSelector(
        (state: RootState) => state.auth
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );
    const [touched, setTouched] = useState<{
        email: boolean;
        password: boolean;
    }>({ email: false, password: false });

    function validateField(field: string, value: string) {
        let error = "";
        if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Please enter a valid email address.";
        }
        if (field === "password" && value.length < 6) {
            error = "Password must be at least 6 characters.";
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
    }

    const handleBlur = (field: "email" | "password", value: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field, value);
    };

    const handleChange = (field: "email" | "password", value: string) => {
        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);

        if (touched[field]) {
            validateField(field, value);
        }
    };

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
            <BackgroundImageLeft src={bubbleImage} alt="Eco bubbles left" />
            <BackgroundImageRight src={bubbleImage} alt="Eco bubbles right" />

            <FormContainer>
                <IntroText>
                    <LeafIcon size={30} />
                    <h1>Welcome Back</h1>
                    <p>Log in to continue your eco-friendly journey</p>
                </IntroText>

                <FormWrapper onSubmit={handleSubmit}>
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
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                            onBlur={(e) => handleBlur("email", e.target.value)}
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
                            onChange={(e) =>
                                handleChange("password", e.target.value)
                            }
                            onBlur={(e) =>
                                handleBlur("password", e.target.value)
                            }
                        />
                        {showPassword ? (
                            <EyeOff
                                className="right-icon"
                                size={18}
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye
                                className="right-icon"
                                size={18}
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </InputGroup>
                    {touched.password && errors.password && (
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
            </FormContainer>
        </Wrapper>
    );
}
