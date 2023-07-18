import React from "react";
import * as S from "./dialogStyles";

export default function UserDialog({ text, timestamp }) {
  return (
    <S.Wrapper>
      <S.UserText>{text}</S.UserText>
      <S.Timestamp right={40}>{timestamp}</S.Timestamp>
    </S.Wrapper>
  );
}
