import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  description: z.string().min(10, "Descrição é obrigatória"),
  photo: z.file(),
  price: z.number().min(0, "Preço deve ser maior que zero"),
  category: z.string().min(2, "Categoria é obrigatória"),
  cashbonus: z.boolean()
});

export type ProductForm = z.infer<typeof ProductFormSchema>;
