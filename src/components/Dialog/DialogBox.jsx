import React, { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import UserDialog from "./UserDialog";
import AiDialog from "./AiDialog";
import useDialogStore from "../../state/dialogStore";
import * as S from "./dialogStyles";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import useAppStore from "../../state/appStore";

export default function DialogBox() {
  const scrollViewRef = useRef(null);
  const conversations = useDialogStore((state) => state.conversations);
  const awaitingResponseFor = useAppStore((state) => state.awaitingResponseFor);
  console.log('dialog', awaitingResponseFor)

  useEffect(() => {
    scrollToEnd();
  }, [conversations, awaitingResponseFor]);

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100); // Delay scroll by 100 milliseconds to allow LoadingIcon to render
    }
  };

  const loadingIconPosition = awaitingResponseFor === 'user' ? 'left' : 'right'

  return (
    <S.DialogBoxWrapper ref={scrollViewRef}>
      <ScrollView>
        {conversations &&
          conversations.map((conversation, index) => (
            <S.ConversationContainer key={conversation.id}>
              {conversation.user && (
                <UserDialog
                  text={conversation.user.text}
                  timestamp={conversation.user.timestamp}
                />
              )}
              {conversation.ai && (
                <AiDialog
                  text={conversation.ai.text}
                  timestamp={conversation.ai.timestamp}
                />
              )}
            </S.ConversationContainer>
          ))}
        {awaitingResponseFor && (
          <LoadingIcon
            position={loadingIconPosition}
          />
        )}
      </ScrollView>
    </S.DialogBoxWrapper>
  );
}
