import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { removeNewLineCharacters } from "../../utils/formatting";
import useAudioStore from "../../state/audioStore";
import useDialogStore from "../../state/dialogStore";
import * as S from "./RecordButtonStyles";
import useAppStore from "../../state/appStore";

const serverURL = "http://192.168.0.43:4000/";

export default function RecordButton() {
  const [isRecording, setIsRecording] = useAudioStore((state) => [
    state.isRecording,
    state.setIsRecording,
  ]);
  const setConversations = useDialogStore((state) => state.setConversations);
  const setRecordingURI = useAudioStore((state) => state.setRecordingURI);
  const [isAwaitingResponse, setIsAwaitingResponse] = useAppStore((state) => [
    isAwaitingResponse,
    state.setIsAwaitingResponse,
  ]);
  const [isPressed, setIsPressed] = useState(false);
  const recording = useRef(null);

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
      await recording.current.startAsync();
      setIsRecording(true);
    } catch (error) {
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
        setRecordingURI(fileUri);

        await getTranscription(fileUri);
      }
    } catch (error) {
      setIsRecording(false);
      console.log("Failed to stop recording", error);
    }
  };

  const getTranscription = async (uri) => {
    try {
      setIsAwaitingResponse(true);
      const formData = new FormData();
      formData.append("file", {
        uri,
        name: "audio.m4a",
        type: "audio/m4a",
      });

      const {
        data: { transcript, chat },
      } = await axios.post(serverURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(transcript, chat);
      if (transcript && chat) {
        console.log("prompt and response recieved");
        setConversations({
          user: removeNewLineCharacters(transcript),
          ai: removeNewLineCharacters(chat),
        });
      }
      setIsAwaitingResponse(false);
    } catch (error) {
      setIsAwaitingResponse(false);
      console.error("Axios Error:", error); // Log the error to the console
      console.log("Axios Error Response:", error.response); // Log the detailed error response
    }
  };
  return (
    <S.Wrapper>
      <S.ButtonContainer isRecording={isRecording}>
        <S.TouchableOpacity
          disabled={isAwaitingResponse}
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
