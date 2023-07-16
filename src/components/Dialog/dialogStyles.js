import styled from "styled-components";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const widthMinus30 = screenWidth - 40;

export const Wrapper = styled.View`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

export const DialogBoxWrapper = styled.ScrollView`
  margin-top: 50px;
  display: flex;
  width: 100%;
`;

export const ConversationContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const UserText = styled.Text`
  border-radius: 10px 0 10px 0;
  font-size: 20px;
  padding: 5px;
  color: white;
  font-weight: 900;
  background: #5a4fbf;
  width: ${widthMinus30}px;
  margin-right: 40px;
`;

export const AiText = styled.Text`
  border-radius: 0 10px 0 10px;
  padding: 5px;
  width: ${widthMinus30}px;
  text-align: right;
  font-size: 20px;
  color: white;
  background: #968fd6;
  margin-left: 40px;
`;
