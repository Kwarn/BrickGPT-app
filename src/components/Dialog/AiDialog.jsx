import React from "react";
import * as S from "./dialogStyles";

export default function AiDialog({ text, timestamp }) {
  return (
    <S.Wrapper>
      <S.AiText>{text}</S.AiText>
      <S.Timestamp left={40}>{timestamp}</S.Timestamp>
    </S.Wrapper>
  );
}
