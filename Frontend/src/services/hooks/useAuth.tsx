import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "../requests/AuthService";
import { UserInfo } from "../requests/AuthService";

export const useFetchUserInfo = (payload: { email: string }) => {
  const navigate = useNavigate();
  const { data, isFetching, isLoading, error } = useQuery<UserInfo, Error>({
    queryKey: ["UserInfo", payload.email],
    queryFn: () => AuthService.fetchUserInfo({ email: payload.email }),
    enabled: !!payload.email,
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    navigate("/login-error");
  }, [error]);
  return { data, isFetching, isLoading };
};
