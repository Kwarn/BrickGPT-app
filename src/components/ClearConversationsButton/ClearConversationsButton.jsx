import React from "react";
import styled from "styled-components";
import useDialogStore from "../../state/dialogStore";

const Wrapper = styled.View`
  position: absolute;
  left: 20px;
  bottom: 55px;
  width: 80px;
  height: 70px;
`;

const Button = styled.Button`
  width: 80px;
  height: 70px;
`;

export default function ClearConversationsButton({ isAwaitingResponse }) {
  const clearConversations = useDialogStore(
    (state) => state.clearConversations
  );

  return (
    <Wrapper>
      <Button title="clear" onPress={clearConversations} />
    </Wrapper>
  );
}
