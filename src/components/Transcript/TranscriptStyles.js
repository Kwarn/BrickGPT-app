import styled from "styled-components";

export const Wrapper = styled.View`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const TranscriptText = styled.Text`
  text-align: center;
  font-size: 20px;
  color: white;
  font-weight: 900;
  background: ${(props) => (props.isRecording ? "#ff6666" : "#5a4fbf")};
`;
