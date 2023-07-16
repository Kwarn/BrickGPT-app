import { create } from "zustand";

const useAudioStore = create((set) => ({
  isRecording: false,
  recordingURI: null,
  setRecordingURI: (uri) => set(() => ({ recordingURI: uri })),
  setIsRecording: (bool) => set(() => ({ isRecording: bool })),
}));

export default useAudioStore;
