import { z } from "zod";

export const NewPasswordFormSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A confirmação de senha deve ter no mínimo 6 caracteres")
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"]
    }
  );

export type NewPasswordForm = z.infer<typeof NewPasswordFormSchema>;
