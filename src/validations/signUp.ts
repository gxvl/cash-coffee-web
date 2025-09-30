import { z } from "zod";

export const SignUpFormSchema = z.object({
  responsibleName: z
    .string()
    .min(1, { message: "O nome e sobrenome são obrigatórios." }),

  responsibleEmail: z
    .string()
    .min(1, { message: "O email é obrigatório." }) // Primeiro checa se está vazio
    .email({ message: "Insira um formato de email válido." }), // Depois checa o formato

  responsiblePhone: z.string().min(1, { message: "O celular é obrigatório." }),

  responsibleCPF: z.string().min(1, { message: "O CPF é obrigatório." }),

  dateOfBirth: z
    .string()
    .min(1, { message: "A data de nascimento é obrigatória." })
});

export type SignUpForm = z.infer<typeof SignUpFormSchema>;
