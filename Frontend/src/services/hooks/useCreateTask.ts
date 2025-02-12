import { useMutation, useQueryClient } from "@tanstack/react-query";
import TasksService from "../requests/TasksService";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TasksService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasksList"] });
    },
  });
};
