import { create } from "zustand";

const useDialogStore = create((set) => ({
  conversations: [],
  setConversations: (conversation) =>
    set((state) => ({
      conversations: [...state.conversations, conversation],
    })),
  clearConversations: () => set(() => ({ conversations: null })),
}));

export default useDialogStore;
