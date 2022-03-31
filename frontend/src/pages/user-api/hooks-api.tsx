import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMe, logout } from "./api";

export const useAuth = () => {
  const { data: user, isLoading } = useQuery("userAuth", getMe, {
    retry: false,

  });

  return { user, isLoading };
};

export const useLogOut = () => {
  const queryClient = useQueryClient();

  const { isSuccess, isLoading, isError, mutate } = useMutation("userLogOut", logout, {
    onSuccess: () => {
      queryClient.resetQueries("userAuth");
    },
  });

  return { isSuccess, isLoading, isError, mutate };
};
