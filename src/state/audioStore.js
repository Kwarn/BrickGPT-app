import { create } from "zustand";

const useAudioStore = create((set) => ({
  audioURI: null,
  setAudioURI: (uri) => set(() => ({ audioURI: uri })),
}));

export default useAudioStore;
