import { z } from "zod";

export const CategoryFormSchema = z.object({
  name: z.string().min(1, { message: "O nome da categoria é obrigatório." }),

  description: z.string().optional()
});

export type CategoryForm = z.infer<typeof CategoryFormSchema>;
