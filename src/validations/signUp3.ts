import { z } from "zod";

export const SignUp3FormSchema = z.object({
  cep: z.string().min(1, { message: "O CEP é obrigatório." }),

  street: z.string().min(1, { message: "A rua é obrigatória." }),

  number: z.string().min(1, { message: "O número é obrigatório." }),

  // O complemento é o único campo que geralmente pode ser opcional.
  // Usamos .optional() para permitir que ele fique vazio.
  complement: z.string().optional(),

  neighborhood: z.string().min(1, { message: "O bairro é obrigatório." }),

  city: z.string().min(1, { message: "A cidade é obrigatória." }),

  uf: z.string().min(1, { message: "O estado (UF) é obrigatório." })
});

export type SignUp3Form = z.infer<typeof SignUp3FormSchema>;
