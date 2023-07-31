import React from 'react'
import styled from "styled-components";
import DialogBox from "../../components/Dialog/DialogBox";

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: "#000000";
`;

export default function Assistant({ recordingUri }) {

  return (
    <Wrapper>
      <DialogBox recordingUri={recordingUri} />
    </Wrapper>
  );
}
