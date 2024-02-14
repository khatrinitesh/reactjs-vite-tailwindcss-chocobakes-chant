import { create } from "zustand";
import zukeeper from "zukeeper";

export const useDataEnrichmentStore = create(
  zukeeper((set) => ({
    dataEnrichment: false,
    changeDataEnrichmentState: () =>
      set((state) => ({ dataEnrichment: !state.dataEnrichment })),
  }))
);
