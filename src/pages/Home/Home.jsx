import styled from "styled-components";
import RecordButton from "../../components/RecordButton/RecordButton";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import useAudioStore from "../../state/audioStore";
import DialogBox from "../../components/Dialog/DialogBox";
import useAppStore from "../../state/appStore";
import ClearConversationsButton from "../../components/ClearConversationsButton/ClearConversationsButton";

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: "#000000";
`;
const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export default function Home() {
  const audioURI = null;
  const recordingURI = useAudioStore((state) => state.recordingURI);
  const isAwaitingResponse = useAppStore((state) => state.isAwaitingResponse);

  return (
    <Wrapper>
      <DialogBox isAwaitingResponse={isAwaitingResponse} />
      <ButtonContainer>
        <RecordButton isAwaitingResponse={isAwaitingResponse} />
        <ClearConversationsButton />
      </ButtonContainer>
      {audioURI && <AudioPlayer audioURI={recordingURI} />}
    </Wrapper>
  );
}
