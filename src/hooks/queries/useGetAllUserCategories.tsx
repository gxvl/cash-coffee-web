import { useQuery } from "@tanstack/react-query";

import { CategoryEntity } from "@/common/entities/category";
import { getCategoriesByUser } from "@/services/categoryService";

interface BackendCategory {
  CategoryId: string;
  UserId: string;
  Name: string;
  Description: string;
  IsActive: boolean;
}

export const useGetAllUserCategories = <T = CategoryEntity[],>(
  userId: string,
  select?: (data: CategoryEntity[]) => T
) => {
  return useQuery({
    queryKey: ["categories", userId],
    queryFn: async () => {
      const response = await getCategoriesByUser(userId);
      const parsedData: BackendCategory[] = JSON.parse(response.data.data);

      // Mapear os campos do backend para o formato da entidade
      return parsedData.map((item) => ({
        id: item.CategoryId,
        userId: item.UserId,
        name: item.Name,
        description: item.Description,
        isActive: item.IsActive
      }));
    },
    select,
    enabled: !!userId,
    staleTime: 45 * 60 * 1000
  });
};
