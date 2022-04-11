import axios from "axios";
import { Task } from "../../interfaces";
import queryString from "query-string";

const API_URL = "/api/tasks/";

export const getTasks = async () => {
  const res = await axios.get(API_URL);

  return res.data;
};

export const setTask = async (task: Task) => {
  const res = await axios.post(API_URL, task);

  return res.data;
};

export const deleteTasks = async (tasksId: string[]) => {
  let queryParams = queryString.stringify({ tasksId }, { arrayFormat: "bracket" });
  const res = await axios.delete(API_URL + '?' + queryParams);

  return res.data;
};
