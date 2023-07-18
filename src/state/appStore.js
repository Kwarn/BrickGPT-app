import { create } from "zustand";

const useAppStore = create((set) => ({
  awaitingResponseFor: null,
  setAwaitingResponseFor: (who) => set(() => ({ awaitingResponseFor: who })),
}));

export default useAppStore;
