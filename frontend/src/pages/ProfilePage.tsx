import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfo from "../components/profile/PersonalInfo";
import MyRides from "../components/profile/MyRides";
import CarDetails from "../components/profile/CarDetails";
import RideHistory from "../components/profile/RideHistory";
import Preferences from "../components/profile/Preferences";
import styled from "styled-components";

const Wrap = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 32px 16px;
`;

const SectionList = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

export default function ProfilePage() {
    return (
        <Wrap>
            <ProfileHeader />
            <SectionList>
                <PersonalInfo />
                <MyRides />
                <CarDetails />
                <RideHistory />
                <Preferences />
            </SectionList>
        </Wrap>
    );
}
