import axios from "axios";
import { Task } from "../../interfaces";

const API_URL = "/api/tasks/";

export const getTasks = async () => {
  const res = await axios.get(API_URL);

  return res.data;
};
