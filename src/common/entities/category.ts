export interface CategoryEntity {
  id: string;
  userId: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface CategoryCreateRequest {
  userId: string;
  name: string;
  description: string;
  isActive: boolean;
}

export type CategoryDTO = Omit<CategoryEntity, "id">;
