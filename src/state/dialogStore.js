import { create } from "zustand";

const useDialogStore = create((set) => ({
  currentConversationId: null,
  conversations: [],
  setCurrentConversationId: (id) => set(() => ({ currentConversationId: id })),
  setConversations: (conversation) =>
    set((state) => ({
      conversations: [...state.conversations, conversation],
    })),
  updateConversation: (id, conversation) =>
    set((state) => {
      const conversations = [...state.conversations];
      const conversationIndex = conversations.findIndex((c) => c.id === id);
      const updatedConversation = {
        ...conversations[conversationIndex],
        ...conversation,
      };
      conversations[conversationIndex] = updatedConversation;
      return { conversations };
    }),
  clearConversations: () => set(() => ({ conversations: [] })),
}));

export default useDialogStore;
