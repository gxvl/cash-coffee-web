import { useQuery } from "@tanstack/react-query";

import type { UserEntity } from "@/common/entities/user";
import { getUserById } from "@/services/userService";

export const useGetUser = (userId: string) => {
  return useQuery<UserEntity>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await getUserById(userId);
      const userData = JSON.parse(response.data.data);
      return userData;
    },
    enabled: !!userId
  });
};
