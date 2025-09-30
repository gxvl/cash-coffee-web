import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.email("Insira um email válido"),
  password: z.string({ error: "Digite a senha" }).min(6, "Insira a senha")
});

export type SignInForm = z.infer<typeof SignInFormSchema>;
