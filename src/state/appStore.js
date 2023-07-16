import { create } from "zustand";

const useAppStore = create((set) => ({
  isAwaitingResponse: null,
  setIsAwaitingResponse: (isAwaitingResponse) =>
    set(() => ({ isAwaitingResponse })),
}));

export default useAppStore;
