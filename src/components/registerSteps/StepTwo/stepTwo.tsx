"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { UserDTO } from "@/common/entities/user";
import InputField from "@/components/InputField/inputField";
import { Button } from "@/components/ui/button";
import { SignUp2Form, SignUp2FormSchema } from "@/validations/signUp2";

export default function StepTwo({
  setUserData,
  setCurrentStep
}: {
  setUserData: (data: Partial<UserDTO>) => void;
  setCurrentStep: (step: number) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<SignUp2Form>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignUp2FormSchema)
  });

  // Remove máscara do CNPJ: "12.345.678/0001-90" -> "12345678000190"
  const unmaskCNPJ = (cnpj?: string): string => {
    if (!cnpj) return "";
    return cnpj.replace(/\D/g, "");
  };

  const onSubmit = (data: SignUp2Form) => {
    const userDTO: Partial<UserDTO> = {
      Alias: data.alias,
      Name: data.name,
      CNPJ: unmaskCNPJ(data.cnpj),
      Email: data.email,
      Password: data.password,
      UserType: 2,
      ChargeTaxFee: parseFloat(data.chargeTaxFee),
      AnnualRevenue: parseFloat(data.annualRevenue)
    };
    setUserData(userDTO);
    setCurrentStep(3);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex w-full flex-col gap-4 md:mt-2"
    >
      <div className="ml-2 flex flex-col items-start gap-0">
        <h4 className="h-8 text-3xl font-extrabold text-[#56381C]">
          Cadastro da
        </h4>
        <h4 className="h-10 text-4xl font-extralight text-[#AD4C24] italic">
          sua cafeteria
        </h4>
      </div>
      <InputField
        name="alias"
        register={register}
        label="Apelido da cafeteria"
        formErrors={errors}
        required
        placeholder="Ex: cafe-do-mar"
      />
      <InputField
        name="name"
        register={register}
        label="Nome da cafeteria"
        formErrors={errors}
        required
        placeholder="Ex: Café do Mar LTDA"
      />
      <InputField
        name="cnpj"
        register={register}
        label="CNPJ"
        formErrors={errors}
        required
        mask="99.999.999/9999-99"
        placeholder="CNPJ (somente números)"
      />
      <InputField
        name="email"
        register={register}
        label="Email da cafeteria"
        formErrors={errors}
        required
        placeholder="Email da cafeteria"
      />
      <InputField
        name="password"
        register={register}
        label="Senha"
        formErrors={errors}
        required
        placeholder="Senha"
        type="password"
      />
      <InputField
        name="chargeTaxFee"
        register={register}
        label="Taxa de cobrança"
        formErrors={errors}
        required
        placeholder="Ex: 0.10"
      />
      <InputField
        name="annualRevenue"
        register={register}
        label="Receita anual"
        formErrors={errors}
        required
        placeholder="Ex: 1200000"
      />
      <div className="flex flex-col gap-3">
        <Button disabled={!isValid} type="submit" className="mt-4">
          Continuar
        </Button>
        <div className="flex flex-col text-center text-[#54361C]">
          <p className="text-sm font-bold">
            Ao criar sua conta, você concorda com nossos
          </p>
          <p className="text-sm font-bold">
            <Link className="text-[#B75427] underline" href="/terms">
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link className="text-[#B75427] underline" href={"/policy"}>
              Política de Privacidade
            </Link>
          </p>
          <p className="mt-5 text-sm font-bold">
            Garantimos a segurança dos seus dados.
          </p>
        </div>
      </div>
    </form>
  );
}
