import React from "react";
import * as S from "./dialogStyles";
import { Text } from "react-native";

export default function UserDialog({ text, timestamp }) {
  return (
    <S.Wrapper>
      <S.UserText>{text}</S.UserText>
      <Text>{timestamp}</Text>
    </S.Wrapper>
  );
}
