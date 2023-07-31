import React, { useState, useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { getTimeStamp } from '../../utils/getTimeStamp'
import { transcribe } from "../../api/transcribeSpeech";
import { askAI } from '../../api/askAi'
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import useDialogStore from "../../state/dialogStore";
import UserDialog from "./UserDialog";
import AiDialog from "./AiDialog";
import * as S from "./dialogStyles";
import uuid from "react-native-uuid";

export default function DialogBox({ recordingUri }) {
  const [awaitingResponseFor, setAwaitingResponseFor] = useState(null)
  const scrollViewRef = useRef(null);

  const [
    conversations,
    currentConversationId,
    setCurrentConversationId,
    setConversations,
    updateConversation,
  ] = useDialogStore((state) => [
    state.conversations,
    state.currentConversationId,
    state.setCurrentConversationId,
    state.setConversations,
    state.updateConversation,
  ]);

  console.log(conversations)

  useEffect(() => {
    const start = async () => {
      if (recordingUri) await handleConversation(recordingUri)
    }
    start()
  }, [recordingUri])


  useEffect(() => {
    scrollToEnd();
  }, [conversations, awaitingResponseFor]);

  const createConverstation = (transcript) => {
    setCurrentConversationId(uuid.v4());
    setConversations({
      id: currentConversationId,
      user: { text: transcript, timestamp: getTimeStamp() },
    });
  };

  const updateConversationWithAiResponse = (aiResponse) => {
    updateConversation(currentConversationId, {
      ai: { text: aiResponse, timestamp: getTimeStamp() },
    });
  };

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100); // Delay scroll by 100 milliseconds to allow LoadingIcon to render
    }
  };

  const handleConversation = async (fileUri) => {
    try {
      setAwaitingResponseFor("user");
      const transcript = await transcribe(fileUri);
      console.log(transcript)
      setAwaitingResponseFor(null);

      createConverstation(transcript);

      setAwaitingResponseFor("ai");
      const aiResponse = await askAI(transcript);
      updateConversationWithAiResponse(aiResponse);

      setAwaitingResponseFor(null);
    } catch (e) {
      setAwaitingResponseFor(null);
    }
  };

  const loadingIconPosition = awaitingResponseFor === 'user' ? 'left' : 'right'

  return (
    <S.DialogBoxWrapper ref={scrollViewRef}>
      <ScrollView>
        {conversations &&
          conversations.map((conversation) => (
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
