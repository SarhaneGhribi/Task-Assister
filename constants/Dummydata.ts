import { Todo } from "@/types";

export const dummyTodos: Todo[] = [
    {
      id: '1',
      title: 'Buy Groceries',
      steps: ['Buy milk', 'Buy bread', 'Buy eggs'],
      priority: 'high',
      category: 'Shopping',
      date: '2024-08-22',
      done: false,
    },
    {
      id: '2',
      title: 'Finish Project',
      steps: ['Complete UI', 'Fix bugs', 'Write tests'],
      priority: 'medium',
      category: 'Work',
      date: '2024-08-25',
      done: false,
    },
    {
      id: '3',
      title: 'Read Book',
      steps: ['Read Chapter 1', 'Read Chapter 2', 'Read Chapter 3'],
      priority: 'low',
      category: 'Leisure',
      date: '2024-08-23',
      done: true,
    },
  ];
  