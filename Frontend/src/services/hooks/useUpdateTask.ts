import { useMutation, useQueryClient } from "@tanstack/react-query";
import TasksService from "../requests/TasksService";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TasksService.updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasksList"] });
    },
  });
};