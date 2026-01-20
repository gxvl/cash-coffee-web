import { useQuery } from "@tanstack/react-query";

import { ProductEntity } from "@/common/entities/product";
import { getProductsByUser } from "@/services/productService";

interface BackendProduct {
  ProductId: string;
  CategoryId: string;
  Name: string;
  Description: string;
  Price: number;
  urlImage: string;
  IsActive: boolean;
  IsBonus: boolean;
}

export const useGetAllUserProducts = <T = ProductEntity[],>(
  userId: string,
  isActive: boolean,
  select?: (data: ProductEntity[]) => T
) => {
  return useQuery({
    queryKey: ["products", userId, isActive],
    queryFn: async () => {
      try {
        const response = await getProductsByUser(userId, isActive);
        const parsedData: BackendProduct[] = JSON.parse(response.data.data);

        // Mapear os campos do backend para o formato da entidade
        return parsedData.map((item) => ({
          id: item.ProductId,
          categoryId: item.CategoryId,
          name: item.Name,
          description: item.Description,
          price: item.Price,
          urlImage: item.urlImage,
          isActive: item.IsActive,
          isBonus: item.IsBonus
        }));
      } catch (error: unknown) {
        // Se for 404 (sem produtos), retorna array vazio
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
