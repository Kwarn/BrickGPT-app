import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import Voice from "@react-native-voice/voice";

const VoiceInputForm = () => {
  const [inputValue, setInputValue] = useState("");

  const startRecognition = async () => {
    try {
      await Voice.start("en-US");
    } catch (error) {
      console.error(error);
    }
  };

  const onSpeechResults = (e) => {
    setInputValue(e.value[0]);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    // Handle form submission with the input value
    Alert.alert("Form Submitted", `You entered: ${inputValue}`);
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onChangeText={handleInputChange}
        value={inputValue}
        placeholder="Type or click the mic..."
      />
      <TouchableOpacity onPress={startRecognition}>
        <Text style={{ color: "blue", marginBottom: 10 }}>
          Click here and say something...
        </Text>
      </TouchableOpacity>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default VoiceInputForm;
