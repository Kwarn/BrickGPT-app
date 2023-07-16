import styled from "styled-components";
import RecordButton from "../../components/RecordButton/RecordButton";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import useAudioStore from "../../state/audioStore";
import DialogBox from "../../components/Dialog/DialogBox";
import useAppStore from "../../state/appStore";

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: "#000000";
`;

export default function Home() {
  const audioURI = null;
  const isRecording = useAudioStore((state) => state.isRecording);
  const isAwaitingResponse = useAppStore((state) => state.isAwaitingResponse)

  return (
    <Wrapper>
      <DialogBox isAwaitingResponse={isAwaitingResponse} />
      <RecordButton isAwaitingResponse={isAwaitingResponse} />
      {audioURI && <AudioPlayer audioURI={audioURI} />}
    </Wrapper>
  );
}
