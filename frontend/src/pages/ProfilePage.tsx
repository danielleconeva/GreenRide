import { useState } from "react";
import styled from "styled-components";
import { User, Settings, Car, Clock, Star } from "lucide-react";

import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfo from "../components/profile/PersonalInfo";
import MyRides from "../components/profile/MyRides";
import CarDetails from "../components/profile/CarDetails";
import RideHistory from "../components/profile/RideHistory";

const Wrap = styled.div`
    font-family: ${({ theme }) => theme.fonts.body};
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
    min-height: 100vh;
`;

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
`;

const TabsWrapper = styled(Container)`
    margin-top: 40px;
    width: 100;
    display: flex;
    justify-content: center;
`;

const Tabs = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 2px;
    background: #fbfcfd;
    border-radius: 10px;
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
    transition: all 0.15s ease;
    white-space: nowrap;
    box-shadow: ${({ active }) =>
        active ? "0 1px 3px 0 rgb(0 0 0 / 0.1)" : "none"};

    svg {
        width: 16px;
        height: 16px;
    }

    &:hover {
        color: #111827;
    }
`;

const Section = styled(Container)`
    background: white;
    padding: 32px;
    margin-top: 7px;
`;

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<
        "personal" | "rides" | "car" | "history" | "prefs"
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
                    <PersonalInfo isEditing={isEditing} />
                )}
                {activeTab === "rides" && <MyRides />}
                {activeTab === "car" && <CarDetails isEditing={isEditing} />}
                {activeTab === "history" && <RideHistory />}
            </Section>
        </Wrap>
    );
}
