import styled from "styled-components";
import RecordButton from "../../components/RecordButton/RecordButton";
import AudioPlayer from "../../components/AudioPlayer";
import useTranscriptStore from "../../state/transcriptStore";
import Transcript from "../../components/Transcript/Transcript";

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: "#000000";
`;

export default function Home() {
  const transcript = useTranscriptStore((state) => state.transcript);
  console.log(transcript)
  return (
    <Wrapper>
      <RecordButton />
      {transcript && <Transcript transcript={transcript} />}
      {/* <AudioPlayer /> */}
    </Wrapper>
  );
}
