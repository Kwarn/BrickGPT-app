import React from "react";
import * as S from "./TranscriptStyles";

export default function Transcript({ transcript }) {
  return (
    <S.Wrapper>
      <S.TranscriptText>{transcript}</S.TranscriptText>
    </S.Wrapper>
  );
}
