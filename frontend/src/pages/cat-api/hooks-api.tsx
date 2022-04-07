import { useQuery } from "react-query";
import { getCats } from "./api";

export const useCats = () => {
  const { data: cats, isLoading, isSuccess, error } = useQuery("cats", getCats);

  return { cats, isLoading, isSuccess, error };
};