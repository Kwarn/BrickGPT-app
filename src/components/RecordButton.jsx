import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import useAudioStore from "../state/audioStore";
import axios from "axios";

const serverURL = "http://192.168.0.43:4000/";

export default function App() {
  const recording = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const setAudioURI = useAudioStore((state) => state.setAudioURI);

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

      console.log("Recording started");
      setIsRecording(true);
    } catch (error) {
      console.log("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
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
        setAudioURI(fileUri);
        console.log("Audio file saved:", fileUri);

        await getTranscription(fileUri);
      }
    } catch (error) {
      setIsRecording(false);
      console.log("Failed to stop recording", error);
    }
  };

  const getTranscription = async (uri) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        name: "audio.m4a",
        type: "audio/m4a",
      });

      const { data } = await axios.post(serverURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      setTranscript(data);
    } catch (error) {
      console.error("Axios Error:", error); // Log the error to the console
      console.log("Axios Error Response:", error.response); // Log the detailed error response
      throw error; // Rethrow the error to handle it in the calling code
    }
  };
  return (
    <View>
      <Text>{transcript}</Text>
      <Text>{isRecording ? "Recording..." : "Press and hold to record"}</Text>
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        style={{
          backgroundColor: isRecording ? "red" : "green",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          {isRecording ? "Recording" : "Press and Hold"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
