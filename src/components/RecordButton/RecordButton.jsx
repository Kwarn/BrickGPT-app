import React, { useState, useEffect, useRef } from "react";
import uuid from "react-native-uuid";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { askAI } from "../../api/askAi";
import { transcribe } from "../../api/transcribeSpeech";
import useAppStore from "../../state/appStore";
import useDialogStore from "../../state/dialogStore";
import useAudioStore from "../../state/audioStore";
import { getTimeStamp } from "../../utils/getTimeStamp";
import * as S from "./RecordButtonStyles";

export default function RecordButton() {
  const [isRecording, setIsRecording] = useAudioStore((state) => [
    state.isRecording,
    state.setIsRecording,
  ]);
  const [
    currentConversationId,
    setCurrentConversationId,
    setConversations,
    updateConversation,
  ] = useDialogStore((state) => [
    state.currentConversationId,
    state.setCurrentConversationId,
    state.setConversations,
    state.updateConversation,
  ]);
  const setRecordingURI = useAudioStore((state) => state.setRecordingURI);
  const [awaitingResponseFor, setAwaitingResponseFor] = useAppStore((state) => [
    state.awaitingResponseFor,
    state.setAwaitingResponseFor,
  ]);
  const [isPressed, setIsPressed] = useState(false);
  const recording = useRef(null);

  const handleConversation = async (fileUri) => {
    try {
      setAwaitingResponseFor("user");
      const transcript = await transcribe(fileUri);
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

  useEffect(() => {
    return () => {
      if (recording.current) {
        stopRecording();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      if (recording?.current?.getStatusAsync().isLoaded) {
        await recording.current.stopAndUnloadAsync();
      }

      recording.current = new Audio.Recording();
      await recording.current.prepareToRecordAsync({
        android: {
          extension: ".m4a", // Save as M4A format on Android
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        },
        ios: {
          extension: ".m4a", // Save as M4A format on iOS
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        },
      });
      setIsRecording(true);
      await recording.current.startAsync();
    } catch (error) {
      setIsRecording(false);
      console.log("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording.current !== null) {
        if (!recording?.current) {
          throw new Error("No current recording found");
        }
        await recording.current.stopAndUnloadAsync();
        setIsRecording(false);

        const uri = recording.current.getURI();
        const info = await FileSystem.getInfoAsync(uri);
        const filename = info.uri.split("/").pop();

        const recordingsDirectory = `${FileSystem.documentDirectory}/recordings/`;
        const fileUri = recordingsDirectory + filename;
        await FileSystem.makeDirectoryAsync(recordingsDirectory, {
          intermediates: true,
        });
        await FileSystem.moveAsync({ from: uri, to: fileUri });

        await setRecordingURI(fileUri);
        await handleConversation(fileUri);
      }
    } catch (error) {
      setIsRecording(false);
      console.log("Failed to stop recording", error);
    }
  };

  return (
    <S.Wrapper>
      <S.ButtonContainer isRecording={isRecording}>
        <S.TouchableOpacity
          disabled={awaitingResponseFor}
          isRecording={isRecording}
          isPressed={isPressed}
          onPressIn={() => {
            setIsPressed(true);
            setTimeout(() => {
              setIsPressed(false);
              startRecording();
            }, 100);
          }}
          onPressOut={stopRecording}
        >
          <S.ButtonText isRecording={isRecording}>
            {isRecording ? "Ask me something.." : "Press and Hold"}
          </S.ButtonText>
        </S.TouchableOpacity>
      </S.ButtonContainer>
    </S.Wrapper>
  );
}
