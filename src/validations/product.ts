import { z } from "zod";

export const ProductFormSchema = z.object({
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  name: z.string().min(2, "Nome do produto é obrigatório"),
  description: z.string().optional(),
  price: z
    .string()
    .min(1, "Preço é obrigatório")
    .regex(/^\d+([,.]?\d{0,2})?$/, "Preço inválido"),
  isBonus: z.boolean().optional()
});

export type ProductForm = z.infer<typeof ProductFormSchema>;

export const ProductEditFormSchema = ProductFormSchema.partial();

export type ProductEditForm = z.infer<typeof ProductEditFormSchema>;
