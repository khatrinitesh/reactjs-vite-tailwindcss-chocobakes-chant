import { create } from "zustand";
import zukeeper from "zukeeper";

export const useRedeemModalStore = create(
  zukeeper((set) => ({
    redeemModal: false,
    content: null,
    changeRedeemModalState: (newContent) =>
      set((state) => ({
        redeemModal: !state.redeemModal,
        content: newContent,
      })),
  }))
);
