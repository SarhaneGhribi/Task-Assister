export type Todo = {
    id: string;
    title: string;
    steps:string[];
    priority: "low" | "medium" | "high";
    category: string;
    date: string;
    done: boolean;
}

export type Pomodoro = {
    id: string;
    timer: number;
    remaining:number;
    color: string;
}

export type Note = {
    id: string;
    title:string;
    body:string;
    createdAt:string;
    updatedAt:string;
}
export type User = {
    name: string;
    language: string;
  };