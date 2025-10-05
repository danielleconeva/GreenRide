import { Leaf } from "lucide-react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import bubbleImage from "../assets/home-bubble-min.png";
import { login } from "../store/authSlice";
import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../store/notificationsSlice";

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeScale = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0) rotate(240deg); }
  50% { transform: translateY(-20px) rotate(245deg); }
  100% { transform: translateY(0) rotate(240deg); }
`;

const LeafIcon = styled(Leaf)`
    background: ${({ theme }) => theme.colors.gradientHero};
    padding: 0.8rem;
    border-radius: 50%;
    color: white;
    opacity: 0;
    animation: ${fadeScale} 0.64s ease forwards;
`;

const Wrapper = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: ${({ theme }) => theme.colors.background};
    overflow: hidden;
    opacity: 0;
    animation: ${fadeSlideUp} 0.72s ease forwards;
    min-height: 100vh;

    @media (max-width: 900px) {
        padding: 3rem 1rem;
        align-items: flex-start;
    }

    @media (max-width: 640px) {
        min-height: auto;
        padding: 2rem 0;
        align-items: flex-start;
    }

    @media (min-width: 1600px) {
        min-height: 95vh;
        padding: 4rem 0;
    }
    @media (min-width: 1920px) {
        min-height: 90vh;
        padding: 4rem 0;
        margin-top: 2rem;
        align-items: flex-start;
        padding-top: 10rem;
    }
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
    animation: ${float} 4.8s ease-in-out infinite;

    @media (max-width: 900px) {
        width: 380px;
        left: -160px;
        opacity: 0.35;
    }

    @media (max-width: 640px) {
        width: 250px;
        left: -100px;
        bottom: 0;
        opacity: 0.3;
    }

    @media (min-width: 1600px) {
        width: 600px;
        left: -250px;
    }

    @media (min-width: 1920px) {
        width: 700px;
        left: -280px;
    }
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
    animation: ${float} 5.6s ease-in-out infinite;

    @media (max-width: 900px) {
        width: 380px;
        right: -200px;
        opacity: 0.35;
    }

    @media (max-width: 640px) {
        width: 250px;
        right: -120px;
        top: 20px;
        opacity: 0.3;
    }

    @media (min-width: 1600px) {
        width: 600px;
        right: -300px;
    }

    @media (min-width: 1920px) {
        width: 700px;
        right: -340px;
    }
`;

const FormContainer = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: start;
    max-width: 1000px;
    width: 100%;
    padding-bottom: 4rem;
    margin-right: 15rem;
    opacity: 0;
    animation: ${fadeScale} 0.8s ease forwards;
    animation-delay: 0.24s;

    @media (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 0;
        padding: 2rem 1rem;
        gap: 2rem;
    }

    @media (max-width: 900px) {
        gap: 2rem;
        padding: 2rem;
    }

    @media (max-width: 640px) {
        padding: 1.5rem 1rem 3rem;
        gap: 1.5rem;
    }

    @media (min-width: 1600px) {
        max-width: 1100px;
        margin-right: 10rem;
        gap: 2.5rem;
    }

    @media (min-width: 1920px) {
        max-width: 1250px;
        margin-right: 8rem;
        gap: 3rem;
    }
`;

const IntroText = styled.div`
    flex: 1;
    text-align: left;
    padding-bottom: 5rem;
    margin-left: 3rem;
    opacity: 0;
    animation: ${fadeSlideUp} 0.64s ease forwards;
    animation-delay: 0.4s;

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

    @media (max-width: 1200px) {
        text-align: center;
        margin-left: 0;
        padding-bottom: 2rem;

        h1 {
            font-size: 2rem;
        }

        p {
            font-size: 1rem;
        }
    }

    @media (max-width: 900px) {
        h1 {
            font-size: 1.9rem;
        }

        p {
            font-size: 0.95rem;
        }
    }

    @media (max-width: 640px) {
        h1 {
            font-size: 1.7rem;
        }

        p {
            font-size: 0.9rem;
        }
    }

    @media (min-width: 1600px) {
        h1 {
            font-size: 2.5rem;
        }

        p {
            font-size: 1.3rem;
        }
    }

    @media (min-width: 1920px) {
        h1 {
            font-size: 2.8rem;
        }

        p {
            font-size: 1.4rem;
        }
    }
`;

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error: serverError } = useSelector(
        (state: RootState) => state.auth
    );

    const {
        email,
        password,
        showPassword,
        errors,
        touched,
        handleBlur,
        handleChange,
        toggleShowPassword,
        handleSubmit,
    } = useLoginForm({
        onValidSubmit: async ({ email, password }) => {
            try {
                await dispatch(login({ email, password })).unwrap();
                dispatch(
                    showNotification({
                        type: "success",
                        message: "Logged in successfully!",
                    })
                );
                navigate("/");
            } catch (err: any) {
                dispatch(
                    showNotification({
                        type: "error",
                        message:
                            err?.message || "Login failed. Please try again.",
                    })
                );
            }
        },
    });

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
                <LoginForm
                    email={email}
                    password={password}
                    showPassword={showPassword}
                    loading={loading}
                    serverError={serverError}
                    touched={touched}
                    errors={errors}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onToggleShowPassword={toggleShowPassword}
                    onSubmit={handleSubmit}
                />
            </FormContainer>
        </Wrapper>
    );
}
