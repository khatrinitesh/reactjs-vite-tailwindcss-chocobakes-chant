import { create } from "zustand";
import zukeeper from "zukeeper";

export const useOtpModalStore = create(
  zukeeper((set) => ({
    otpModal: false,
    changeOtpModalState: () => set((state) => ({ otpModal: !state.otpModal })),
  }))
);
