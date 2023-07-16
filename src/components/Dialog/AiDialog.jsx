import React from "react";
import * as S from "./dialogStyles";

export default function AiDialog({ text }) {
  return (
    <S.Wrapper>
      <S.AiText>{text}</S.AiText>
    </S.Wrapper>
  );
}
