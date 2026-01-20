export interface ProductEntity {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  urlImage?: string;
  isActive?: boolean;
  isBonus: boolean;
}

export interface ProductCreateRequest {
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  image?: File;
  isBonus: boolean;
}

export interface ProductUpdateRequest {
  productId: string;
  categoryId?: string;
  name?: string;
  description?: string;
  price?: number;
  isActive?: boolean;
  isBonus?: boolean;
  image?: File;
}

export type ProductDTO = Omit<ProductEntity, "id">;
