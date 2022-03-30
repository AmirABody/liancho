import { useQuery } from "react-query";
import { getMe } from "./api";

export const useAuth = () => {
  const { data: user, isLoading } = useQuery("userAuth", getMe, {
    retry: false,
  });

  return { user, isLoading };
};
