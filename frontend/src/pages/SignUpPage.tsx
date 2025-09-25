import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useState } from "react";
import { register } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
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
    margin: 4rem 15rem 0 0;
`;

const IntroText = styled.div`
    flex: 1;
    text-align: left;
    padding-bottom: 5rem;
    margin-left: 3rem;

    h1 {
        margin-bottom: 0.5rem;
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
        font-size: 1.8rem;
        margin: 0 auto;
        color: ${({ theme }) => theme.colors.foreground};
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
        background: ${({ theme }) => theme.colors.gradientHero};
        color: ${({ theme }) => theme.colors.primaryForeground};
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

export default function SignUpPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error: serverError } = useSelector(
        (state: RootState) => state.auth
    );

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState<{
        username?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateAll(vals: {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) {
        const newErrors: typeof errors = {};

        const usernameTrim = vals.username.trim();
        const emailTrim = vals.email.trim();
        const passNorm = vals.password.normalize("NFKC").trim();
        const confNorm = vals.confirmPassword.normalize("NFKC").trim();

        if (!usernameTrim) newErrors.username = "Username is required.";
        if (!emailRegex.test(emailTrim))
            newErrors.email = "Please enter a valid email address.";
        if (passNorm.length < 6)
            newErrors.password = "Password must be at least 6 characters.";
        if (passNorm && confNorm && confNorm !== passNorm)
            newErrors.confirmPassword = "Passwords do not match.";

        return newErrors;
    }

    const handleBlur = (field: keyof typeof touched) => {
        setTouched((prev) => ({ ...prev, [field]: true }));

        setErrors(validateAll({ username, email, password, confirmPassword }));
    };

    const handleChange = (field: keyof typeof touched, value: string) => {
        if (field === "username") setUsername(value);
        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);
        if (field === "confirmPassword") setConfirmPassword(value);

        setErrors((prev) => {
            const vals = {
                username: field === "username" ? value : username,
                email: field === "email" ? value : email,
                password: field === "password" ? value : password,
                confirmPassword:
                    field === "confirmPassword" ? value : confirmPassword,
            };
            const next = { ...prev };

            if (touched.username) {
                next.username = vals.username.trim()
                    ? undefined
                    : "Username is required.";
            }
            if (touched.email) {
                next.email = emailRegex.test(vals.email.trim())
                    ? undefined
                    : "Please enter a valid email address.";
            }
            if (touched.password) {
                next.password =
                    vals.password.normalize("NFKC").trim().length >= 6
                        ? undefined
                        : "Password must be at least 6 characters.";
            }
            if (touched.confirmPassword) {
                const p = vals.password.normalize("NFKC").trim();
                const c = vals.confirmPassword.normalize("NFKC").trim();
                next.confirmPassword =
                    p && c && p !== c ? "Passwords do not match." : undefined;
            }
            return next;
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const raw = {
            username: String(fd.get("username") ?? ""),
            email: String(fd.get("email") ?? ""),
            password: String(fd.get("password") ?? ""),
            confirmPassword: String(fd.get("confirmPassword") ?? ""),
        };

        const normalized = {
            username: raw.username.trim(),
            email: raw.email.trim(),
            password: raw.password.normalize("NFKC").trim(),
            confirmPassword: raw.confirmPassword.normalize("NFKC").trim(),
        };

        const newErrors = validateAll(normalized);
        setTouched({
            username: true,
            email: true,
            password: true,
            confirmPassword: true,
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        dispatch(
            register({
                username: normalized.username,
                email: normalized.email,
                password: normalized.password,
                confirmPassword: normalized.confirmPassword,
            })
        ).then(() => {
            navigate("/");
        });
    };

    return (
        <Wrapper>
            <BackgroundImageLeft src={bubbleImage} alt="Eco bubbles left" />
            <BackgroundImageRight src={bubbleImage} alt="Eco bubbles right" />

            <FormContainer>
                <IntroText>
                    <LeafIcon size={30} />
                    <h1>Join GreenRide</h1>
                    <p>Start sharing rides and saving the planet</p>
                </IntroText>

                <FormWrapper onSubmit={handleSubmit} noValidate>
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
                            onChange={(e) =>
                                handleChange("username", e.target.value)
                            }
                            onBlur={() => handleBlur("username")}
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
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                            onBlur={() => handleBlur("email")}
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
                            onChange={(e) =>
                                handleChange("password", e.target.value)
                            }
                            onBlur={() => handleBlur("password")}
                            autoComplete="new-password"
                        />
                        {showPassword ? (
                            <EyeOff
                                className="right-icon"
                                size={18}
                                onClick={() => setShowPassword(false)}
                                aria-label="Hide password"
                                role="button"
                                tabIndex={0}
                            />
                        ) : (
                            <Eye
                                className="right-icon"
                                size={18}
                                onClick={() => setShowPassword(true)}
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
                                handleChange("confirmPassword", e.target.value)
                            }
                            onBlur={() => handleBlur("confirmPassword")}
                            autoComplete="new-password"
                        />
                        {showConfirmPassword ? (
                            <EyeOff
                                className="right-icon"
                                size={18}
                                onClick={() => setShowConfirmPassword(false)}
                                aria-label="Hide confirm password"
                                role="button"
                                tabIndex={0}
                            />
                        ) : (
                            <Eye
                                className="right-icon"
                                size={18}
                                onClick={() => setShowConfirmPassword(true)}
                                aria-label="Show confirm password"
                                role="button"
                                tabIndex={0}
                            />
                        )}
                    </InputGroup>
                    {touched.confirmPassword && errors.confirmPassword && (
                        <ValidationError>
                            {errors.confirmPassword}
                        </ValidationError>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>

                    {serverError && (
                        <ValidationError>{serverError}</ValidationError>
                    )}

                    <p>
                        Already have an account?{" "}
                        <SignupLink to="/login">Log in</SignupLink>
                    </p>
                </FormWrapper>
            </FormContainer>
        </Wrapper>
    );
}
