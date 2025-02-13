import { useQuery } from "@tanstack/react-query";
import TasksService from "../requests/TasksService";

export const useFetchProjects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasksList"],
    queryFn: TasksService.fetchTasks,
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: true,
  });
  return { data, isLoading, error };
};
