import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import TasksService from "../requests/TasksService";

export const useFetchTasks = () => {
  const location = useLocation();
  const project_id = location.state?.project_id; 
  return useQuery({
    queryKey: ["tasksList", project_id],
    queryFn: () => (project_id ? TasksService.fetchTasks(project_id) : Promise.resolve(null)),
    enabled: !!project_id, 
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
