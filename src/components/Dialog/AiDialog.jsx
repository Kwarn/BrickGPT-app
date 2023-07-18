import React from "react";
import * as S from "./dialogStyles";
import { Text } from "react-native";

export default function AiDialog({ text, timestamp }) {
  return (
    <S.Wrapper>
      <S.AiText>{text}</S.AiText>
      <Text>{timestamp}</Text>
    </S.Wrapper>
  );
}
