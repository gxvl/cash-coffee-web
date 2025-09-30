import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ToastDealer(message: string) {
  console.log("ToastDealer message:", message);
  switch (message) {
    case "Success. Generate Token":
      return "Login realizado com sucesso!";
    case "Request failed with status code 404":
      return "Usuário não encontrado. Verifique o CNPJ e tente novamente.";
    case "Success. UserResponse":
      return "Usuário encontrado com sucesso!";
    case "Success. ValidateCodeEmailResponse":
      return "Código validado com sucesso!";
    default:
      return message;
  }
}
