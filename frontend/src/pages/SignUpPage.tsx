import { Leaf } from "lucide-react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import bubbleImage from "../assets/home-bubble-min.png";
import { register } from "../store/authSlice";
import SignUpForm from "../components/SignUpForm";
import { useSignUpForm } from "../hooks/useSignUpForm";
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

    @media (min-width: 1600px) {
        padding: 1rem;
        width: 48px;
        height: 48px;
    }

    @media (min-width: 1920px) {
        padding: 1.25rem;
        width: 58px;
        height: 58px;
    }
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

    opacity: 0;
    animation: ${fadeSlideUp} 0.72s ease forwards;

    @media (min-width: 1600px) {
        min-height: 95vh;
        padding: 4rem 0;
    }

    @media (min-width: 1920px) {
        min-height: 90vh;
        padding: 5rem 0;
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

    @media (min-width: 1600px) {
        width: 620px;
        left: -250px;
        opacity: 0.45;
    }

    @media (min-width: 1920px) {
        width: 750px;
        left: -280px;
        opacity: 0.5;
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

    @media (min-width: 1600px) {
        width: 620px;
        right: -300px;
        opacity: 0.45;
    }

    @media (min-width: 1920px) {
        width: 750px;
        right: -340px;
        opacity: 0.5;
    }
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
    gap: 3rem;

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

    @media (min-width: 768px) and (max-width: 1024px) {
        form {
            transform: scale(1.1);
        }
    }

    @media (max-width: 640px) {
        padding: 1.2rem 1rem 2rem;
        gap: 1.5rem;
        margin-top: 1rem;
    }

    @media (min-width: 1600px) {
        max-width: 1150px;
        margin-right: 9rem;
        gap: 2rem;

        form {
            transform: scale(1.1);
        }
    }

    @media (min-width: 1920px) {
        max-width: 1300px;
        margin-right: 15rem;
        gap: 1.5rem;

        form {
            transform: scale(1.2);
        }
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

    @media (min-width: 768px) and (max-width: 1024px) {
        h1 {
            font-size: 2.4rem;
        }

        p {
            font-size: 1.2rem;
        }
    }

    @media (max-width: 640px) {
        h1 {
            font-size: 1.7rem;
            margin-top: 0.5rem;
        }

        p {
            font-size: 0.9rem;
        }
    }

    @media (min-width: 1600px) {
        h1 {
            font-size: 2.6rem;
        }

        p {
            font-size: 1.35rem;
        }
    }

    @media (min-width: 1920px) {
        h1 {
            font-size: 2.9rem;
        }

        p {
            font-size: 1.45rem;
        }
    }
`;

export default function SignUpPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error: serverError } = useSelector(
        (s: RootState) => s.auth
    );

    const form = useSignUpForm({
        onValidSubmit: (normalized) =>
            dispatch(register(normalized))
                .unwrap()
                .then(() => {
                    dispatch(
                        showNotification({
                            type: "success",
                            message: "Welcome to GreenRide!",
                        })
                    );
                    navigate("/");
                })
                .catch((err: any) => {
                    dispatch(
                        showNotification({
                            type: "error",
                            message:
                                err?.message ||
                                "Signup failed. Please try again.",
                        })
                    );
                }),
    });

    return (
        <Wrapper>
            <BackgroundImageLeft src={bubbleImage} alt="Eco bubbles left" />
            <BackgroundImageRight src={bubbleImage} alt="Eco bubbles right" />

            <FormContainer>
                <IntroText>
                    <LeafIcon size={32} />
                    <h1>Join GreenRide</h1>
                    <p>Start sharing rides and saving the planet</p>
                </IntroText>

                <SignUpForm
                    values={form.values}
                    errors={form.errors}
                    touched={form.touched}
                    loading={loading}
                    serverError={serverError}
                    showPassword={form.showPassword}
                    showConfirmPassword={form.showConfirmPassword}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    onToggleShowPassword={form.toggleShowPassword}
                    onToggleShowConfirm={form.toggleShowConfirmPassword}
                    onSubmit={form.handleSubmit}
                />
            </FormContainer>
        </Wrapper>
    );
}
