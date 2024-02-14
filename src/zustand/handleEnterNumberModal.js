import { create } from "zustand";
import zukeeper from "zukeeper";

export const useEnterNumberModalStore = create(
  zukeeper((set) => ({
    enterNumberModal: false,
    enterNumberModalState: () =>
      set((state) => ({ enterNumberModal: !state.enterNumberModal })),
  }))
);
