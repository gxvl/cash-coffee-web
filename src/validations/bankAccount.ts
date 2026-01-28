import { z } from "zod";

export const BankAccountFormSchema = z.object({
  bankCode: z.string().min(1, { message: "O código do banco é obrigatório." }),

  bankBranchNumber: z
    .string()
    .min(1, { message: "O número da agência é obrigatório." }),

  bankBranchCheckDigit: z
    .string()
    .min(1, { message: "O dígito da agência é obrigatório." }),

  bankAccountNumber: z
    .string()
    .min(1, { message: "O número da conta é obrigatório." }),

  bankAccountCheckDigit: z
    .string()
    .min(1, { message: "O dígito da conta é obrigatório." }),

  bankAccountType: z.enum(["Corrente", "Poupança"], {
    message: "Selecione um tipo de conta válido."
  }),
  pixKey: z.string().optional()
});

export type BankAccountForm = z.infer<typeof BankAccountFormSchema>;
