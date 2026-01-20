import { useQuery } from "@tanstack/react-query";

import { getOrderSummary } from "@/services/orderService";

export const useGetOrderSummary = (orderId: string) => {
  return useQuery({
    queryKey: ["order-summary", orderId],
    queryFn: async () => {
      const response = await getOrderSummary(orderId);
      const parsedData = JSON.parse(response.data.data);
      return parsedData;
    },
    enabled: !!orderId
  });
};
