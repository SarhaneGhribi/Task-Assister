import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from "zustand/middleware";
import { User } from "@/types"

type UserStore = {
  user: User;
  setName: (name: string) => void;
  setLanguage: (language: string) => void;
  getUser: () => User;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: {
        name: "",
        language: "en",
      },

      setName: (name) => set((state) => ({ user: { ...state.user, name } })),

      setLanguage: (language) =>
        set((state) => ({ user: { ...state.user, language } })),

      getUser: () => get().user,
    }),
    {
      name: "user-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
