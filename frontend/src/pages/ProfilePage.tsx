import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { User, Settings, Car, Clock } from "lucide-react";

import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfo from "../components/profile/PersonalInfo";
import MyRides from "../components/profile/MyRides";
import CarDetails from "../components/profile/CarDetails";
import RideHistory from "../components/profile/RideHistory";

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

const Wrap = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
    min-height: 100vh;

    opacity: 0;
    animation: ${fadeSlideUp} 0.8s ease forwards;
`;

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
`;

const TabsWrapper = styled(Container)`
    margin-top: 40px;
    display: flex;
    justify-content: center;

    opacity: 0;
    animation: ${fadeScale} 0.5s ease forwards;
    animation-delay: 0.3s;
`;

const Tabs = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 2px;
    background: #fbfcfd;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const Tab = styled.button<{ active?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 0.4rem 3rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: ${({ active }) => (active ? "#111827" : "#6b7280")};
    border: none;
    border-radius: 10px;
    background: ${({ active }) => (active ? "#ffffff" : "transparent")};
    cursor: pointer;
    transition: all 0.45s ease;
    white-space: nowrap;
    box-shadow: ${({ active }) =>
        active ? "0 2px 6px rgba(0,0,0,0.08)" : "none"};

    svg {
        width: 16px;
        height: 16px;
    }
`;

const Section = styled(Container)`
    background: white;
    padding: 32px;
    margin-top: 7px;
    margin-bottom: 1rem;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.3s;
`;

const TabContent = styled.div`
    opacity: 0;
    transform: translateY(10px);
    animation: ${fadeSlideUp} 1.1s ease forwards;
`;

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<
        "personal" | "rides" | "car" | "history"
    >("personal");

    const [isEditing, setIsEditing] = useState(false);

    return (
        <Wrap>
            <Container>
                <ProfileHeader
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
            </Container>

            <TabsWrapper>
                <Tabs>
                    <Tab
                        active={activeTab === "personal"}
                        onClick={() => setActiveTab("personal")}
                    >
                        <User />
                        Personal
                    </Tab>
                    <Tab
                        active={activeTab === "rides"}
                        onClick={() => setActiveTab("rides")}
                    >
                        <Settings />
                        My Rides
                    </Tab>
                    <Tab
                        active={activeTab === "car"}
                        onClick={() => setActiveTab("car")}
                    >
                        <Car />
                        Car Details
                    </Tab>
                    <Tab
                        active={activeTab === "history"}
                        onClick={() => setActiveTab("history")}
                    >
                        <Clock />
                        Ride History
                    </Tab>
                </Tabs>
            </TabsWrapper>

            <Section>
                {activeTab === "personal" && (
                    <TabContent>
                        <PersonalInfo isEditing={isEditing} />
                    </TabContent>
                )}
                {activeTab === "rides" && (
                    <TabContent>
                        <MyRides />
                    </TabContent>
                )}
                {activeTab === "car" && (
                    <TabContent>
                        <CarDetails isEditing={isEditing} />
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
