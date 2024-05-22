import { Range } from "@/lib/types";
import { create } from "zustand";

export type Reservation = {
  range: Range;
  setRange: (range: Range) => void;
  resetRange: () => void;
};

export const useReservation = create<Reservation>((set) => ({
  range: undefined,
  setRange: (range: Range) => set({ range }),
  resetRange: () => set({ range: undefined }),
}));
