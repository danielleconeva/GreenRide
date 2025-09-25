import { Leaf } from "lucide-react";
import styled from "styled-components";

import { UseSelector, useDispatch } from "react-redux";

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

export default function LoginPage() {
    return (
        <Wrapper>
            <LeafIcon size={30} />
            <h1>Welcome Back</h1>
            <p>Log in to continue your eco-friendly journey</p>
            <FormWrapper>
                <h3>Log In</h3>
                <p>Use your email and password to continue</p>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                />

                <button type="button">Log In</button>

                <p>Don't have an account? Sign up</p>
            </FormWrapper>
        </Wrapper>
    );
}
