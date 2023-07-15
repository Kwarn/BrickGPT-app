import styled from "styled-components";
import RecordButton from "../components/RecordButton";
import AudioPlayer from "../components/AudioPlayer";

const StyledContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function Home() {
  return (
    <StyledContainer>
      <RecordButton />
      <AudioPlayer />
    </StyledContainer>
  );
}
