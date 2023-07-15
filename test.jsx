import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av';
import { FileSystem } from 'expo-file-system';

export default function App() {
  const recording = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURI, setAudioURI] = useState(null);

  useEffect(() => {
    return () => {
      if (recording.current) {
        recording.current.stopAndUnloadAsync();
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

      const recordingOptions = {
        android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      };

      recording.current = new Audio.Recording();
      await recording.current.prepareToRecordAsync(recordingOptions);
      await recording.current.startAsync();

      console.log('Recording started');
      setIsRecording(true);
    } catch (error) {
      console.log('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.current.stopAndUnloadAsync();
      const uri = recording.current.getURI();
      setAudioURI(uri);
      setIsRecording(false);
    } catch (error) {
      console.log('Failed to stop recording', error);
    }
  };

  const playRecording = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioURI });
      await sound.playAsync();
    } catch (error) {
      console.log('Failed to play recording', error);
    }
  };

  return (
    <View>
      <Text>{isRecording ? 'Recording...' : 'Press the button to start recording'}</Text>
      {isRecording ? (
        <Button title="Stop Recording" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      {audioURI && (
        <Button title="Play Recording" onPress={playRecording} />
      )}
    </View>
  );
}
