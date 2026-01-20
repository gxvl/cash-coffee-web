import { useQuery } from "@tanstack/react-query";

import { OrderResponse } from "@/common/entities/order";
import { ProductEntity } from "@/common/entities/product";
import { getOrdersByUser } from "@/services/orderService";

interface BackendOrderItem {
  OrderItemId: string;
  OrderShopId: string;
  ProductId: string;
  IsBonus: boolean;
  Amount: number;
  Price: number;
  Product?: ProductEntity;
}

interface BackendOrder {
  OrderShopId: string;
  ShopId: string;
  ShopName: string;
  InternalNumber: string;
  CreatedAt: string;
  OrderStatus: number;
  Comments: string;
  Items: BackendOrderItem[];
  FinishAt: string;
  TotalAmount: number;
  TokenPayment: string;
  AmountServiceFee: number;
}

export const useGetAllUserOrders = <T = OrderResponse[],>(
  userId: string,
  paginas: number,
  linhas: number,
  select?: (data: OrderResponse[]) => T
) => {
  return useQuery({
    queryKey: ["orders", userId, paginas, linhas],
    queryFn: async () => {
      try {
        const response = await getOrdersByUser(userId, paginas, linhas);
        const parsedData: BackendOrder[] = JSON.parse(response.data.data);

        // Mapear os campos do backend para o formato da entidade
        return parsedData.map((order) => ({
          orderShopId: order.OrderShopId,
          shopId: order.ShopId,
          shopName: order.ShopName,
          internalNumber: order.InternalNumber,
          createdAt: order.CreatedAt,
          orderStatus: order.OrderStatus,
          comments: order.Comments,
          items: order.Items.map((item) => ({
            orderItemId: item.OrderItemId,
            orderShopId: item.OrderShopId,
            productId: item.ProductId,
            isBonus: item.IsBonus,
            amount: item.Amount,
            price: item.Price,
            product: item.Product
              ? {
                  id: (item.Product as any).ProductId,
                  categoryId: (item.Product as any).CategoryId,
                  name: (item.Product as any).Name,
                  description: (item.Product as any).Description,
                  price: (item.Product as any).Price,
                  urlImage: (item.Product as any).UrlImage,
                  isActive: (item.Product as any).IsActive,
                  isBonus: (item.Product as any).IsBonus
                }
              : undefined
          })),
          finishAt: order.FinishAt,
          totalAmount: order.TotalAmount,
          tokenPayment: order.TokenPayment,
          amountServiceFee: order.AmountServiceFee
        }));
      } catch (error: unknown) {
        // Se for 404 (sem pedidos), retorna array vazio
        if (
          (error as { response?: { status?: number } })?.response?.status ===
          404
        ) {
          return [];
        }
        throw error;
      }
    },
    select,
    enabled: !!userId,
    retry: (failureCount, error: unknown) => {
      // Não tenta novamente em caso de 404
      if (
        (error as { response?: { status?: number } })?.response?.status === 404
      ) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 45 * 60 * 1000
  });
};
