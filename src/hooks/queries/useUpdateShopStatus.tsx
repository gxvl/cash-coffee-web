import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateShopStatus } from "@/services/userService";

export const useUpdateShopStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      shopId,
      isOpenShop
    }: {
      shopId: string;
      isOpenShop: boolean;
    }) => updateShopStatus(shopId, isOpenShop),
    onSuccess: () => {
      // Invalidate user query to refetch updated shop status
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });
};
