"use client";

import InputField from "@/components/InputField/inputField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function UserForm() {
  return (
    <>
      <InputField secondary label="Nome" placeholder="Digite seu nome" />
      <InputField secondary label="Email" placeholder="Digite seu email" />
      <InputField
        secondary
        label="Telefone"
        placeholder="Digite seu telefone"
      />
      <InputField secondary label="CPF" placeholder="Digite seu CPF" />
      <div className="flex flex-col gap-1">
        <p className="text-sm text-white">Sexo</p>
        <Select>
          <SelectTrigger className="w-full rounded-lg border-[#AD4C24] py-6 text-sm text-white shadow-none data-[placeholder]:text-white">
            <SelectValue className="text-white" placeholder="Sexo" />
          </SelectTrigger>
          <SelectContent className="text-lg">
            <SelectItem value="male">Masculino</SelectItem>
            <SelectItem value="female">Feminino</SelectItem>
            <SelectItem value="nb">Não-binário</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <InputField label="CEP" secondary placeholder="Digite seu CEP" />
      <InputField
        secondary
        label="Endereço"
        placeholder="Digite seu endereço"
      />
      <InputField
        secondary
        label="Número"
        placeholder="Digite o número do endereço"
      />
      <InputField secondary label="Estado" placeholder="Digite seu estado" />
      <InputField secondary label="Cidade" placeholder="Digite sua cidade" />
      <InputField secondary label="Bairro" placeholder="Digite seu bairro" />
      <InputField
        secondary
        label="Complemento"
        placeholder="Digite seu complemento"
      />
    </>
  );
}
