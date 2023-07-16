import styled from "styled-components";

export const Wrapper = styled.View`
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  height: 220px;
  width: 150px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  justify-content: center;
  height: 150px;
  width: 150px;
  border-radius: 75px;
  background-color: ${(props) => (props.isRecording ? "#ff6666" : "#5a4fbf")};
  border: 3px solid ${(props) => (props.isRecording ? "#ff9999" : "#847cd0")};
  overflow: hidden;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  height: 150px;
  width: 150px;
  border-radius: 100px;
  opacity: ${(props) => (props.isPressed ? 0.8 : 1)};
  background-color: ${(props) => (props.isRecording ? "#ff6666" : "#5a4fbf")};
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-size: 20px;
  color: white;
  font-weight: 900;
  background: ${(props) => (props.isRecording ? "#ff6666" : "#5a4fbf")};
`;
