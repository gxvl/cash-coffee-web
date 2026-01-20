import { useQuery } from "@tanstack/react-query";

import { getUserPhotoUrl } from "@/services/userService";

export const useGetUserPhotoUrl = (userId: string) => {
  return useQuery<string>({
    queryKey: ["userPhoto", userId],
    queryFn: async () => {
      const response = await getUserPhotoUrl(userId);
      return response.data.message;
    },
    enabled: !!userId
  });
};
