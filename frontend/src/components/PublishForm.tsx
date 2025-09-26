import styled from "styled-components";

const TripDetailsFieldSet = styled.div``;
const CarInformationFieldSet = styled.div``;
const AmenitiesFieldSet = styled.div``;

export default function PublishForm() {
    return (
        <>
            <form>
                <TripDetailsFieldSet />
                <CarInformationFieldSet />
                <AmenitiesFieldSet />
            </form>
        </>
    );
}
