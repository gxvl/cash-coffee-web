import { z } from "zod";

export const ForgotFormSchema = z.object({
  cnpj: z.string("Insira um CNPJ válido")
});

export type ForgotForm = z.infer<typeof ForgotFormSchema>;
