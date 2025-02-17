import { useQuery } from "@tanstack/react-query";
import ProjectsService from "../requests/ProjectsService";

export const useFetchProjects = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["projectsList"],
    queryFn: ProjectsService.fetchProjects,
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: true,
  });
  return { data, isLoading, error, refetch };
};
