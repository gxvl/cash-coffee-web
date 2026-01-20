import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UserUpdateDTO } from "@/common/entities/user";
import { updateUser } from "@/services/userService";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserUpdateDTO) => updateUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });
};
