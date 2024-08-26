import { create } from "zustand";
import { Note } from "@/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from "zustand/middleware";

type NoteStore = {
    note: Note | null;
    notes: Note[];
    getOneNote: (id: string) => Note | undefined;
    getAllNotes: () => Note[];
    createNote: (note: Note) => void;
    updateNote: (id: string, updatedNote: Partial<Note>) => void;
    deleteNote: (id: string) => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
        note: null,
        notes: [],

        getOneNote: (id) => {
            return get().notes.find((note) => note.id === id);
        },

        getAllNotes: () => {
            return get().notes.slice().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        },

        createNote: (note) => {
            set((state) => ({
                notes: [...state.notes, note],
            }));
        },

        updateNote: (id, updatedNote) => {
            set((state) => ({
                notes: state.notes.map((note) =>
                    note.id === id ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() } : note
                ),
            }));
        },

        deleteNote: (id) => {
            set((state) => ({
                notes: state.notes.filter((note) => note.id !== id),
            }));
        },
    }),
    {
      name: "note-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
