import styled from "styled-components";
import RecordButton from "../../components/RecordButton/RecordButton";
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
const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export default function FormFiller() {
  return (
    <Wrapper>
      <Form />
      <ButtonContainer>
        <RecordButton />
      </ButtonContainer>
    </Wrapper>
  );
}
