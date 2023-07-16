import React from "react";
import * as S from "./dialogStyles";

export default function UserDialog({ text }) {
  return (
    <S.Wrapper>
      <S.UserText>{text}</S.UserText>
    </S.Wrapper>
  );
}
