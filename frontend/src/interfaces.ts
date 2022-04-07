export interface User {
  fullName: string;
  email: string;
  password: string;
}

export type Priority = "high" | "medium" | "low";

export const PriorityColors: Record<Priority, string> = {
  low: "#38bdf8", //tw-sky-400
  medium: "#facc15", //tw-yellow-400
  high: "#ef4444", //tw-red-500
};

export enum CategoryColors {
  AMBER_500 = "#f59e0b",
  LIME_500 = "#84cc16",
  SKY_500 = "#0ea5e9",
  PURPLE_500 = "#a855f7",
  PINK_500 = "#ec4899",
  ORANGE_500 = "#f97316",
  INDIGO_500 = "#6366f1",
  GREEN_500 = "#22c55e",
}

export interface Category {
  _id: string;
  color: CategoryColors;
  title: string;
}

export interface Task {
  priority: Priority;
  title: string;
  category: Category;
  dueDate: Date;
  reminder: boolean;
  time: number;
}

export interface Toast {
  id: number;
  type: "info" | "success" | "warning" | "error";
  message: string;
}

export type DashboardTab = "overview" | "tasks" | "reports" | "infography";
