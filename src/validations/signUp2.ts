import { z } from "zod";

export const SignUp2FormSchema = z.object({
  cafeteriaName: z
    .string()
    .min(1, { message: "O nome da cafeteria é obrigatório." }),

  cafeteriaEmail: z
    .string()
    .min(1, { message: "O email da cafeteria é obrigatório." })
    .email({ message: "Insira um formato de email válido." }),

  cafeteriaPhone: z
    .string()
    .min(1, { message: "O celular da cafeteria é obrigatório." }),

  cnpj: z.string().min(1, { message: "O CNPJ é obrigatório." }),

  corporateReason: z
    .string()
    .min(1, { message: "A razão social é obrigatória." })
});

export type SignUp2Form = z.infer<typeof SignUp2FormSchema>;
