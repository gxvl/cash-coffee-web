import { z } from "zod";

export const SignUp3FormSchema = z.object({
  phoneInternational: z
    .string()
    .min(1, { message: "O código internacional é obrigatório." }),

  phoneWithDDD: z
    .string()
    .min(1, { message: "O telefone é obrigatório." })
    .min(10, { message: "O telefone deve ter pelo menos 10 dígitos." })
});

export type SignUp3Form = z.infer<typeof SignUp3FormSchema>;
