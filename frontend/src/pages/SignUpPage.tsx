import { Leaf } from "lucide-react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import bubbleImage from "../assets/home-bubble-min.png";
import { register } from "../store/authSlice";

import SignUpForm from "../components/SignUpForm";
import { useSignUpForm } from "../hooks/useSignUpForm";

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%   { transform: translateY(0) rotate(240deg); }
  50%  { transform: translateY(-20px) rotate(245deg); }
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
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: ${({ theme }) => theme.colors.background};
    overflow: hidden;

    opacity: 0;
    animation: ${fadeSlideUp} 0.72s ease forwards;
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

    opacity: 0;
    animation: ${fadeScale} 0.8s ease forwards;
    animation-delay: 0.24s;
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
`;

export default function SignUpPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error: serverError } = useSelector(
        (s: RootState) => s.auth
    );

    const form = useSignUpForm({
        onValidSubmit: (normalized) =>
            dispatch(register(normalized)).then(() => {
                navigate("/");
            }),
    });

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
