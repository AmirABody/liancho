import axios from "axios"
import { User } from "../interfaces";

const API_URL = "/api/users/"

export const register = async (user: User) => {
  console.log("axios send req")
  const res = await axios.post(API_URL, user);

  return res.data;
}