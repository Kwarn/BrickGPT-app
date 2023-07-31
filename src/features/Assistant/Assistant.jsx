import React, { useState } from 'react'
import styled from "styled-components";
import RecordButton from "../../components/RecordButton/RecordButton";
import DialogBox from "../../components/Dialog/DialogBox";
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

export default function Assistant() {
  const [recordingUri, setRecordingUri] = useState('')

  return (
    <Wrapper>
      <DialogBox recordingUri={recordingUri} />
      <ButtonContainer>
        <RecordButton callback={(fileUri) => setRecordingUri(fileUri)} />
        <ClearConversationsButton />
      </ButtonContainer>
    </Wrapper>
  );
}
