import { z } from "zod";

export const SignUpFormSchema = z.object({
  responsibleName: z
    .string()
    .min(1, { message: "O nome e sobrenome são obrigatórios." }),

  responsibleEmail: z
    .string()
    .min(1, { message: "O email é obrigatório." })
    .email({ message: "Insira um formato de email válido." }),

  responsiblePhone: z.string().min(1, { message: "O celular é obrigatório." }),

  responsibleCPF: z.string().min(1, { message: "O CPF é obrigatório." }),

  responsibleOccupation: z
    .string()
    .min(1, { message: "A ocupação é obrigatória." }),

  responsibleMonthlyIncome: z
    .string()
    .min(1, { message: "A renda mensal é obrigatória." })
});

export type SignUpForm = z.infer<typeof SignUpFormSchema>;
