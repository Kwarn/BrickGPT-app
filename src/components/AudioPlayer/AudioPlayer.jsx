import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Button } from "react-native";

export default function AudioPlayer(audioURI) {
  const [sound, setSound] = useState(null);

  if (phrase) {
  }

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
      <Button title="Play" onPress={ play} />
    </View>
  );
}
