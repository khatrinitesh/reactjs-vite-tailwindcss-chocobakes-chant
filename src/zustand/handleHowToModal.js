import { create } from "zustand";
import zukeeper from "zukeeper";

export const useHowToModalStore = create(
  zukeeper((set) => ({
    howToModal: false,
    changeHowToModalState: () =>
      set((state) => ({ howToModal: !state.howToModal })),
  }))
);
