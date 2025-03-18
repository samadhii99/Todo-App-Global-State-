// src/types/todo.ts
export type TodoCategory =
  | "work"
  | "personal"
  | "shopping"
  | "health"
  | "other";
export type TodoPriority = "high" | "medium" | "low";

export interface Todo {
  id: string;
  text: string; // Legacy field, maintained for compatibility
  title?: string; // New field, gradually replacing text
  description?: string;
  completed: boolean;
  category?: TodoCategory;
  priority: TodoPriority;
  createdAt: string;
  dueDate?: string; // ISO date string
  [key: string]: any; // Allow for additional properties
}
