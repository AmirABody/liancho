import { useQuery } from "react-query";
import { getTasks } from "./api";

export const useTasks = () => {
  const { data: tasks, isLoading, isSuccess, error } = useQuery("tasks", getTasks);

  return { tasks, isLoading, isSuccess, error };
};
