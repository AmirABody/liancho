import axios from "axios";
import { User } from "../interfaces";

const API_URL = "/api/users/";

export const register = async (user: User) => {
  const res = await axios.post(API_URL, user);

  return res.data;
};

export const login = async (user: Pick<User, "email" | "password">) => {
  const res = await axios.post(API_URL + "login", user);

  return res.data;
};
