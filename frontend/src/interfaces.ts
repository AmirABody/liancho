export interface User {
  fullName: string;
  email: string;
  password: string;
}

export interface Response {
  type: "success" | "warning" | "error";
  message: string;
}
