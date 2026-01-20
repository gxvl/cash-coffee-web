import { useQuery } from "@tanstack/react-query";

import { ProductEntity } from "@/common/entities/product";
import { getProductById } from "@/services/productService";

interface BackendProduct {
  ProductId: string;
  CategoryId: string;
  Name: string;
  Description: string;
  Price: number;
  urlImage: string;
  IsActive: boolean;
}

export const useGetProductById = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await getProductById(productId);
      const parsedData: BackendProduct = JSON.parse(response.data.data);
      // Mapear os campos do backend para o formato da entidade
      return {
        id: parsedData.ProductId,
        categoryId: parsedData.CategoryId,
        name: parsedData.Name,
        description: parsedData.Description,
        price: parsedData.Price,
        urlImage: parsedData.urlImage,
        isActive: parsedData.IsActive
      } as ProductEntity;
    },
    enabled: !!productId,
    staleTime: 45 * 60 * 1000
  });
};
