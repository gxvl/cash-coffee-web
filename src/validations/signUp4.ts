import { z } from "zod";

export const SignUp4FormSchema = z.object({
  bank: z.string().min(1, { message: "O nome do banco é obrigatório." }),
  agency: z.string().min(1, { message: "O número da agência é obrigatório." }),
  agencyCode: z
    .string()
    .min(1, { message: "O dígito da agência é obrigatório." }),
  account: z.string().min(1, { message: "O número da conta é obrigatório." }),
  accountCode: z
    .string()
    .min(1, { message: "O dígito da conta é obrigatório." })
});

export type SignUp4Form = z.infer<typeof SignUp4FormSchema>;
