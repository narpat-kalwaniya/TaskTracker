import { useQuery } from "@tanstack/react-query";
import AuthService from "../requests/AuthService";
import { UserInfo } from "../requests/AuthService";

export const useFetchUserInfo = (payload: { email: string }) => {
  const { data, isFetching, isLoading } = useQuery<UserInfo, Error>({
    queryKey: ["UserInfo", payload.email],
    queryFn: () => AuthService.fetchUserInfo({ email: payload.email }),
    enabled: !!payload.email,
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return { data, isFetching, isLoading };
};
