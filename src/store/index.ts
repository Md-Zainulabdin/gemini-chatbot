import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  name: string;
  setName: (name: string) => void;
  removeName: () => void;
};

const useStore = create<State>((set) => ({
  name: "John Doe",
  setName: (name) => set((state) => ({ name })),
  removeName: () => set((state) => ({ name: "" })),
}));

export default useStore;
