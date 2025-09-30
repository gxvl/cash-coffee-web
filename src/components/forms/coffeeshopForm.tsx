"use client";

import InputField from "@/components/InputField/inputField";

export default function CoffeeshopForm() {
  return (
    <>
      <InputField
        secondary
        label="Nome da Cafeteria"
        placeholder="Digite o nome do estabelecimento"
      />
      <InputField secondary label="CNPJ" placeholder="Digite o CNPJ" />
      <InputField
        secondary
        label="Email de Contato"
        placeholder="Digite o email comercial"
      />
      <InputField
        secondary
        label="Telefone Comercial"
        placeholder="Digite o telefone de contato"
      />
      <InputField
        secondary
        label="Nome do Responsável"
        placeholder="Digite o nome do responsável legal"
      />
      <InputField label="CEP" secondary placeholder="Digite o CEP" />
      <InputField secondary label="Endereço" placeholder="Digite o endereço" />
      <InputField
        secondary
        label="Número"
        placeholder="Digite o número do endereço"
      />
      <InputField secondary label="Estado" placeholder="Digite o estado" />
      <InputField secondary label="Cidade" placeholder="Digite a cidade" />
      <InputField secondary label="Bairro" placeholder="Digite o bairro" />
    </>
  );
}
