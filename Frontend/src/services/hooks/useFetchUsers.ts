import { useQuery } from "@tanstack/react-query";
import AuthService from "../requests/AuthService";
import { UserInfo } from "../requests/AuthService";

export const useFetchUsers = () => {
  const { data, isFetching, isLoading } = useQuery<UserInfo, Error>({
    queryKey: ["UsersList"],
    queryFn: () => AuthService.fetchUserInfo(),
    enabled: true,
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return { data, isFetching, isLoading };
};
