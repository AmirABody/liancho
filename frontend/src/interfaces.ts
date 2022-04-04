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

export interface Category {
  color: string;
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
