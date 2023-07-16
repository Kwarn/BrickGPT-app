import { create } from "zustand";

const useDialogStore = create((set) => ({
  conversations: [],
  setConversations: (conversation) =>
    set((state) => ({
      conversations: [...state.conversations, conversation],
    })),
}));

export default useDialogStore;
