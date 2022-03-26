export interface User {
  fullName: string;
  email: string;
  password: string;
}

export interface Toast {
  id: number;
  type: "info" | "success" | "warning" | "error";
  message: string;
}