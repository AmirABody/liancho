import axios from "axios";
import { User } from "../../interfaces";

const API_URL = "/api/users/";

export const getMe = async () => {
  let res = await axios.get(API_URL + "me");

  return res.data;
};

export const register = async (user: User) => {
  const res = await axios.post(API_URL, user);

  return res.data;
};

export const login = async (user: Pick<User, "email" | "password">) => {
  const res = await axios.post(API_URL + "login", user);

  return res.data;
};

export const sendPasswordReset = async (email: string) => {
  const res = await axios.post(API_URL + "password-reset", { email });

  return res.data;
};

export const logout = async () => {
  const res = await axios.get(API_URL + "logout");

  return res.data;
};
