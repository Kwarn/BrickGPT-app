import { create } from "zustand";

const useTranscriptStore = create((set) => ({
    currentTranscript: null,
    setCurrentConversationId: (transcript) => set(() => ({ currentTranscript: transcript })),
}));

export default useTranscriptStore;
