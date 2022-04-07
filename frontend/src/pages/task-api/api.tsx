import axios from "axios";
import { Task } from "../../interfaces";

const API_URL = "/api/tasks/";

export const getTasks = async () => {
  const res = await axios.get(API_URL);

  return res.data;
};

export const setTask = async (task: Task) => {
  const res = await axios.post(API_URL, task);

  return res.data;
}
