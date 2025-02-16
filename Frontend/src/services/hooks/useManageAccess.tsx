import { useMutation, useQueryClient } from "@tanstack/react-query";
import ManageAccessService from "../requests/ManageAccessService";

export const useAddNewUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ManageAccessService.AddNewUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newUser"] });
    },
  });
};
