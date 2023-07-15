import { create } from "zustand";

const useAudioStore = create((set) => ({
  isRecording: false,
  audioURI: null,
  setAudioURI: (uri) => set(() => ({ audioURI: uri })),
  setIsRecording: (bool) => set(() => ({ isRecording: bool })),
}));

export default useAudioStore;
