import { create } from "zustand";
import { Pomodoro } from "@/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from "zustand/middleware";

type PomodoroStore = {
    pomodoro: Pomodoro | null;
    addPomodoro: (pomodoro: Pomodoro) => void;
    getPomodoro: (id: string) => Pomodoro | undefined;
    updatePomodoro: (id: string, updatedPomodoro: Partial<Pomodoro>) => void;
    completePomodoro: (id: string) => void;
};

export const usePomodoroStore = create<PomodoroStore>()(
  persist(
    (set, get) => ({
        pomodoro: null,

        addPomodoro: (pomodoro) => {
            set({ pomodoro });
        },

        getPomodoro: (id: string) => {
            const { pomodoro } = get();
            return pomodoro?.id === id ? pomodoro : undefined;
        },

        updatePomodoro: (id, updatedPomodoro) => {
            set((state) => {
                if (state.pomodoro?.id === id) {
                    return {
                        pomodoro: { ...state.pomodoro, ...updatedPomodoro },
                    };
                }
                return state;
            });
        },

        completePomodoro: (id) => {
            set((state) => {
                if (state.pomodoro?.id === id) {
                    return { pomodoro: null };
                }
                return state;
            });
        },
    }),
    {
      name: "pomodoro-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
