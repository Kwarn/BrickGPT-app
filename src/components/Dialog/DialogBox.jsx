import React from "react";
import UserDialog from "./UserDialog";
import AiDialog from "./AiDialog";
import useDialogStore from "../../state/dialogStore";
import * as S from "./dialogStyles";

export default function DialogBox() {
  const conversations = useDialogStore((state) => state.conversations);

  return (
    <S.DialogBoxWrapper>
      {conversations &&
        conversations.map((conversation, index) => (
          <S.ConversationContainer key={index}>
            <UserDialog text={conversation.user} />
            <AiDialog text={conversation.ai} />
          </S.ConversationContainer>
        ))}
    </S.DialogBoxWrapper>
  );
}
