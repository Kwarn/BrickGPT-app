import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { Audio } from "expo-av";

export default function AudioPlayer(audioURI) {
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
