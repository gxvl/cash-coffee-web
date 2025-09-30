import { z } from "zod";

export const CodeFormSchema = z.object({
  code: z.string("Insira um código válido")
});

export type CodeForm = z.infer<typeof CodeFormSchema>;
