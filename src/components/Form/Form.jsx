import React, { useEffect, useState } from "react";
import { Button, Alert } from "react-native";
import * as S from './FormStyles'
import { transcribe } from '../../api/transcribeSpeech'

const Form = ({ recordingUri }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const start = async () => {
      await getTranscript()
    }
    start()
  }, [recordingUri])

  const getTranscript = async () => {
    const transcript = await transcribe(recordingUri)
    console.log(transcript)
  }

  const handleSubmit = () => {
    // Handle form submission with the input value
    Alert.alert("Form Submitted", `You entered: ${inputValue}`);
  };

  return (
    <S.Wrapper style={{ padding: 16 }}>
      <S.TextInput
        value={inputValue}
        placeholder="Type or click the mic..."
      />
      <Button title="Submit" onPress={handleSubmit} />
    </S.Wrapper>
  );
};

export default Form;
