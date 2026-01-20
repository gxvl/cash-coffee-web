import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadUserPhoto } from "@/services/userService";

export const useUploadUserPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, imageFile }: { userId: string; imageFile: File }) =>
      uploadUserPhoto(userId, imageFile),
    onSuccess: () => {
      // Invalidate user queries if needed
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });
};
