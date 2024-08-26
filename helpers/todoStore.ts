import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from "zustand/middleware";
import { Todo } from "@/types";

type TodoStore = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updatedTodo: Partial<Todo>) => void;
  getTodos: () => Todo[];
  getTodoById: (id: string) => Todo | undefined;
  getTodosByPriority: (priority: string) => Todo[];
  getTodosByCategory: (category: string) => Todo[];
  getDoneTodos: () => Todo[];
  getNotDoneTodos: () => Todo[];
  getTodaysTodos: () => Todo[];
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),

      updateTodo: (id, updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
          ),
        })),

      getTodos: () => get().todos,

      getTodoById: (id) => get().todos.find((todo) => todo.id === id),

      getTodosByPriority: (priority) =>
        get().todos.filter((todo) => todo.priority === priority && !todo.done),

      getTodosByCategory: (category) =>
        get().todos.filter((todo) => todo.category === category),

      getDoneTodos: () => get().todos.filter((todo) => todo.done),

      getNotDoneTodos: () => get().todos.filter((todo) => !todo.done),

      getTodaysTodos: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().todos.filter((todo) => todo.date === today);
      },
    }),
    {
      name: "todo-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
