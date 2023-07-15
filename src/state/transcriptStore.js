import { create } from "zustand";

const useTranscriptStore = create((set) => ({
  transcript: null,
  setTranscript: (transcript) => set(() => ({ transcript })),
}));

export default useTranscriptStore;
