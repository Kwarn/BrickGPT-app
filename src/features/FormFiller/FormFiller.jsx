import React from 'react'
import styled from "styled-components";
import Form from '../../components/Form/Form'

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: "#000000";
`;

export default function FormFiller({ recordingUri }) {
  console.log('fired')
  return (
    <Wrapper>
      <Form recordingUri={recordingUri} />
    </Wrapper>
  );
}
