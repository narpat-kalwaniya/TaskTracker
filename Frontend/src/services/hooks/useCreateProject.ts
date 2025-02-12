import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProjectsService from "../requests/ProjectsService";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProjectsService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectsList"] });
    },
  });
};
