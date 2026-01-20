import { z } from "zod";

export const UserFormSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z
    .string()
    .min(1, { message: "O email é obrigatório." })
    .email({ message: "Insira um formato de email válido." }),
  phoneNumber: z.string().min(1, { message: "O telefone é obrigatório." }),
  cpf: z.string().min(1, { message: "O CPF é obrigatório." }),
  gender: z.number().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  complement: z.string().optional()
});

export type UserForm = z.infer<typeof UserFormSchema>;
