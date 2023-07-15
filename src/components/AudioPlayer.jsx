import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import useAudioStore from "../state/audioStore";
import { Button } from "react-native";
// Component that receives the file URI prop
export default function AudioPlayer() {
  const audioURI = useAudioStore((state) => state.audioURI);

  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (audioURI) {
      const loadSound = async () => {
        const { sound } = await Audio.Sound.createAsync({ uri: audioURI });
        setSound(sound);
      };
      loadSound();
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioURI]);

  const play = async () => {
    try {
      if (sound) {
        await sound.playAsync();
      }
    } catch (error) {
      console.log("Failed to play audio", error);
    }
  };

  return (
    <View>
      <Button title="Play" onPress={play} />
    </View>
  );
}
