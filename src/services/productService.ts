import type { AxiosResponse } from "axios";

import {
  ProductCreateRequest,
  ProductEntity,
  ProductUpdateRequest
} from "@/common/entities/product";

import api from "./api";

interface ProductApiResponse {
  statusCode: number;
  message: string;
  path: string;
  data: string; // JSON stringified array
}

/**
 * Função para criar um novo produto.
 * @param productData - Os dados do novo produto.
 */
export const createProduct = (
  productData: ProductCreateRequest
): Promise<AxiosResponse<ProductEntity>> => {
  const formData = new FormData();

  formData.append("CategoryId", productData.categoryId);
  formData.append("Name", productData.name);
  formData.append("Price", String(productData.price));
  formData.append("IsBonus", String(productData.isBonus));

  if (productData.description) {
    formData.append("Description", productData.description);
  }

  if (productData.image) {
    formData.append("Image", productData.image);
  }

  return api.post("/orders/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

/**
 * Função para listar produtos de um usuário por status de ativação.
 * @param userId - O ID do usuário.
 * @param isActive - Se deve retornar produtos ativos ou inativos.
 */
export const getProductsByUser = (
  userId: string,
  isActive: boolean
): Promise<AxiosResponse<ProductApiResponse>> => {
  return api.get("/orders/product/user/isactive", {
    params: {
      userId,
      isActive
    }
  });
};

/**
 * Função para obter um produto por ID.
 * @param productId - O ID do produto.
 */
export const getProductById = (
  productId: string
): Promise<AxiosResponse<ProductApiResponse>> => {
  return api.get("/orders/product", {
    params: {
      productId
    }
  });
};

/**
 * Função para atualizar um produto.
 * @param productData - Os dados do produto a serem atualizados.
 */
export const updateProduct = (
  productData: ProductUpdateRequest
): Promise<AxiosResponse<ProductEntity>> => {
  const formData = new FormData();

  formData.append("ProductId", productData.productId);

  if (productData.categoryId) {
    formData.append("CategoryId", productData.categoryId);
  }

  if (productData.name) {
    formData.append("Name", productData.name);
  }

  if (productData.description) {
    formData.append("Description", productData.description);
  }

  if (productData.price !== undefined) {
    formData.append("Price", String(productData.price));
  }

  if (productData.isActive !== undefined) {
    formData.append("IsActive", String(productData.isActive));
  }

  if (productData.isBonus !== undefined) {
    formData.append("IsBonus", String(productData.isBonus));
  }

  if (productData.image) {
    formData.append("Image", productData.image);
  }

  return api.put("/orders/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

/**
 * Função para deletar um produto.
 * @param productId - O ID do produto a ser deletado.
 */
export const deleteProduct = (
  productId: string
): Promise<AxiosResponse<void>> => {
  return api.delete("/orders/product", {
    params: {
      productId
    }
  });
};
