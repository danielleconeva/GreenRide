import { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { User, Settings, Car, Clock } from "lucide-react";

import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfo from "../components/profile/PersonalInfo";
import MyRides from "../components/profile/MyRides";
import CarDetails from "../components/profile/CarDetails";
import RideHistory from "../components/profile/RideHistory";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useProfile } from "../hooks/useProfile";
import { showNotification } from "../store/notificationsSlice";

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Wrap = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    min-height: 100vh;
    overflow-x: hidden;

    opacity: 0;
    animation: ${fadeSlideUp} 0.8s ease forwards;

    @media (max-width: 900px) {
        max-width: 100%;
        padding: 0 0.75rem;
    }

    @media (max-width: 640px) {
        padding: 0 0.5rem;
    }

    @media (min-width: 1600px) {
        max-width: 1400px;
        padding: 0 2rem;
    }

    @media (min-width: 1920px) {
        max-width: 1600px;
        padding: 0 3rem;
    }
`;

export const Container = styled.div`
    width: 70%;
    margin: 0 auto;

    @media (max-width: 1200px) {
        width: 80%;
    }

    @media (max-width: 900px) {
        width: 95%;
    }

    @media (max-width: 640px) {
        width: 100%;
    }

    @media (min-width: 1600px) {
        width: 75%;
    }

    @media (min-width: 1920px) {
        width: 70%;
    }
`;

export const TabsWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    padding: 0;

    opacity: 0;
    animation: ${fadeScale} 0.5s ease forwards;
    animation-delay: 0.3s;

    @media (max-width: 1200px) {
        width: 80%;
    }

    @media (max-width: 900px) {
        margin-top: 30px;
        width: 95%;
    }

    @media (max-width: 640px) {
        margin-top: 20px;
        width: 100%;
    }

    @media (min-width: 1600px) {
        margin-top: 50px;
        width: 75%;
    }

    @media (min-width: 1920px) {
        margin-top: 60px;
        width: 70%;
    }
`;

export const Tabs = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    padding: 3px;
    background: #fbfcfd;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    @media (max-width: 900px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, auto);
        gap: 6px;
        width: 100%;
        max-width: 100%;
        padding: 6px;
        box-sizing: border-box;
    }

    @media (max-width: 640px) {
        gap: 5px;
        padding: 5px;
    }
`;

export const Tab = styled.button<{ active?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.5rem 2.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: ${({ active }) => (active ? "#111827" : "#6b7280")};
    border: none;
    border-radius: 10px;
    background: ${({ active }) => (active ? "#ffffff" : "transparent")};
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: ${({ active }) =>
        active ? "0 2px 6px rgba(0,0,0,0.08)" : "none"};
    white-space: nowrap;
    box-sizing: border-box;

    svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
    }

    &:hover {
        color: #111827;
    }

    @media (max-width: 900px) {
        padding: 0.6rem 0.4rem;
        font-size: 0.8rem;
        gap: 0.4rem;
        width: 100%;
        min-width: 0;

        svg {
            width: 15px;
            height: 15px;
        }
    }

    @media (max-width: 640px) {
        padding: 0.55rem 0.3rem;
        font-size: 0.72rem;
        gap: 0.3rem;

        svg {
            width: 13px;
            height: 13px;
        }
    }

    @media (min-width: 1600px) {
        padding: 0.6rem 3rem;
        font-size: 1rem;

        svg {
            width: 18px;
            height: 18px;
        }
    }

    @media (min-width: 1920px) {
        padding: 0.7rem 3.5rem;
        font-size: 1.05rem;

        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

export const Section = styled(Container)`
    background: #ffffff;
    padding: 32px;
    margin-top: 7px;
    margin-bottom: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow-x: hidden;

    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.3s;

    @media (max-width: 900px) {
        padding: 20px;
        margin-bottom: 1rem;
        width: 95%;
    }

    @media (max-width: 640px) {
        padding: 16px 12px;
        margin-bottom: 0.8rem;
        width: 100%;
    }

    @media (min-width: 1600px) {
        padding: 40px;
        margin-bottom: 2rem;
    }

    @media (min-width: 1920px) {
        padding: 48px;
        margin-bottom: 2.5rem;
    }
`;

export const TabContent = styled.div`
    opacity: 0;
    transform: translateY(10px);
    animation: ${fadeSlideUp} 1.1s ease forwards;

    @media (max-width: 640px) {
        transform: none;
    }
`;

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<
        "personal" | "rides" | "car" | "history"
    >("personal");
    const [isEditing, setIsEditing] = useState(false);

    const personalRef = useRef<any>(null);
    const carRef = useRef<any>(null);

    const dispatch = useDispatch<AppDispatch>();
    const updateProfile = useUpdateProfile();
    const { refetch } = useProfile();

    async function handleSave() {
        const personalData = personalRef.current?.formData;
        const carData = carRef.current?.carData;

        try {
            await updateProfile.mutateAsync({ ...personalData, car: carData });
            await refetch();

            dispatch(
                showNotification({
                    type: "success",
                    message: "Profile updated successfully",
                })
            );
        } catch (err: any) {
            dispatch(
                showNotification({
                    type: "error",
                    message: err?.message || "Failed to update profile",
                })
            );
        } finally {
            setIsEditing(false);
        }
    }

    return (
        <Wrap>
            <Container>
                <ProfileHeader
                    isEditing={isEditing}
                    setIsEditing={(v) => {
                        if (isEditing && !v) handleSave();
                        else setIsEditing(v);
                    }}
                />
            </Container>

            <TabsWrapper>
                <Tabs>
                    <Tab
                        active={activeTab === "personal"}
                        onClick={() => setActiveTab("personal")}
                    >
                        <User /> Personal
                    </Tab>
                    <Tab
                        active={activeTab === "rides"}
                        onClick={() => setActiveTab("rides")}
                    >
                        <Settings /> My Rides
                    </Tab>
                    <Tab
                        active={activeTab === "car"}
                        onClick={() => setActiveTab("car")}
                    >
                        <Car /> Car Details
                    </Tab>
                    <Tab
                        active={activeTab === "history"}
                        onClick={() => setActiveTab("history")}
                    >
                        <Clock /> Ride History
                    </Tab>
                </Tabs>
            </TabsWrapper>

            <Section>
                {activeTab === "personal" && (
                    <TabContent>
                        <PersonalInfo ref={personalRef} isEditing={isEditing} />
                    </TabContent>
                )}
                {activeTab === "rides" && (
                    <TabContent>
                        <MyRides />
                    </TabContent>
                )}
                {activeTab === "car" && (
                    <TabContent>
                        <CarDetails ref={carRef} isEditing={isEditing} />
                    </TabContent>
                )}
                {activeTab === "history" && (
                    <TabContent>
                        <RideHistory />
                    </TabContent>
                )}
            </Section>
        </Wrap>
    );
}
