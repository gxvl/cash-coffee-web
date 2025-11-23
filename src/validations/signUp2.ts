import { z } from "zod";

export const SignUp2FormSchema = z.object({
  alias: z
    .string()
    .min(1, { message: "O apelido da cafeteria é obrigatório." }),

  name: z.string().min(1, { message: "O nome da cafeteria é obrigatório." }),

  cnpj: z.string().min(1, { message: "O CNPJ é obrigatório." }),

  email: z
    .string()
    .min(1, { message: "O email da cafeteria é obrigatório." })
    .email({ message: "Insira um formato de email válido." }),

  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),

  chargeTaxFee: z
    .string()
    .min(1, { message: "A taxa de cobrança é obrigatória." }),

  annualRevenue: z
    .string()
    .min(1, { message: "A receita anual é obrigatória." })
});

export type SignUp2Form = z.infer<typeof SignUp2FormSchema>;
