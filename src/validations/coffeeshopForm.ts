import { z } from "zod";

export const CoffeeshopFormSchema = z.object({
  coffeeshopName: z
    .string()
    .min(1, { message: "O nome da cafeteria é obrigatório." }),
  cnpj: z.string().min(1, { message: "O CNPJ é obrigatório." }),
  email: z
    .string()
    .min(1, { message: "O email é obrigatório." })
    .email({ message: "Insira um formato de email válido." }),
  phoneNumber: z
    .string()
    .min(1, { message: "O telefone comercial é obrigatório." }),
  zipCode: z.string().min(1, { message: "O CEP é obrigatório." }),
  street: z.string().min(1, { message: "O endereço é obrigatório." }),
  number: z.string().min(1, { message: "O número é obrigatório." }),
  state: z.string().min(1, { message: "O estado é obrigatório." }),
  city: z.string().min(1, { message: "A cidade é obrigatória." }),
  neighborhood: z.string().min(1, { message: "O bairro é obrigatório." })
});

export type CoffeeshopForm = z.infer<typeof CoffeeshopFormSchema>;
