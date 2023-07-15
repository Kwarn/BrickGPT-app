import { useWhisper } from "@chengsokdara/use-whisper";
import { Button, Text, View } from "react-native";

export default function SpeechToText() {
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: "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",
    removeSilence: true,
  });

  const record = () => {
    console.log("starting");
    startRecording();
    console.log(startRecording);
  };
  const stopRecord = () => {
    console.log("stopping");
    stopRecording();
  };

  return (
    <View>
      <Text>Recording: {recording}</Text>
      <Text>Speaking: {speaking}</Text>
      <Text>Transcribing: {transcribing}</Text>
      <Text>Transcribed Text: {transcript.text}</Text>
      <Button onPress={record} title="Start" />
      <Button onPress={stopRecord} title="Stop" />
    </View>
  );
}
