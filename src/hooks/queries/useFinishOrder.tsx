import { useMutation, useQueryClient } from "@tanstack/react-query";

import { finishOrder } from "@/services/orderService";

export const useFinishOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderShopId: string) => {
      const response = await finishOrder(orderShopId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      });
    }
  });
};
