import { z } from "zod";

export const SignUp5FormSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
      .regex(/[a-zA-Z]/, {
        message: "A senha deve conter pelo menos uma letra."
      })
      .regex(/\d/, { message: "A senha deve conter pelo menos um número." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "A senha deve conter pelo menos um caractere especial."
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "A confirmação da senha é obrigatória." })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirmPassword"]
  });

export type SignUp5Form = z.infer<typeof SignUp5FormSchema>;
