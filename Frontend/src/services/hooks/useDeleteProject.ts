import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProjectsService from "../requests/ProjectsService";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProjectsService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteProject"] });
    },
  });
};
