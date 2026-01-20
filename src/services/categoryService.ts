import type { AxiosResponse } from "axios";

import {
  CategoryCreateRequest,
  CategoryEntity
} from "@/common/entities/category";

import api from "./api";

/**
 * Função para criar uma nova categoria.
 * @param categoryData - Os dados da nova categoria.
 */
export const createCategory = (
  categoryData: CategoryCreateRequest
): Promise<AxiosResponse<CategoryEntity>> => {
  return api.post("/orders/category", {
    ...categoryData,
    description: categoryData.name
  });
};

interface CategoryApiResponse {
  statusCode: number;
  message: string;
  path: string;
  data: string; // JSON stringified array
}

/**
 * Função para listar todas as categorias de um usuário.
 * @param userId - ID do usuário.
 * @param isActive - Filtrar por categorias ativas (opcional, padrão true).
 */
export const getCategoriesByUser = (
  userId: string,
  isActive: boolean = true
): Promise<AxiosResponse<CategoryApiResponse>> => {
  return api.get("/orders/category/user", {
    params: {
      userId,
      isActive
    }
  });
};

/**
 * Função para atualizar uma categoria.
 * @param categoryId - ID da categoria.
 * @param userId - ID do usuário.
 * @param name - Nome da categoria.
 * @param isActive - Status da categoria.
 */
export const updateCategory = (
  categoryId: string,
  userId: string,
  name: string,
  isActive: boolean = true
): Promise<AxiosResponse<CategoryEntity>> => {
  return api.put("/orders/category", {
    categoryId,
    userId,
    name,
    description: name,
    isActive
  });
};

/**
 * Função para deletar uma categoria.
 * @param categoryId - ID da categoria.
 */
export const deleteCategory = (
  categoryId: string
): Promise<AxiosResponse<void>> => {
  return api.delete("/orders/category", {
    params: {
      categoryId
    }
  });
};
