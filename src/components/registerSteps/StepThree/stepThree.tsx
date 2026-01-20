"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { UserDTO } from "@/common/entities/user";
import InputField from "@/components/InputField/inputField";
import { Button } from "@/components/ui/button";
import { SignUp3Form, SignUp3FormSchema } from "@/validations/signUp3";

export default function StepThree({
  setCurrentStep,
  setUserData
}: {
  setCurrentStep: (step: number) => void;
  setUserData: (data: Partial<UserDTO>) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<SignUp3Form>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignUp3FormSchema)
  });

  const onSubmit = (data: SignUp3Form) => {
    // Extrai DDD (primeiros 2 dígitos) e número (restante)
    const phoneWithDDD = data.phoneWithDDD.replace(/\D/g, ""); // Remove caracteres não numéricos
    const ddd = phoneWithDDD.substring(0, 2);
    const number = phoneWithDDD.substring(2);

    const userDTO: Partial<UserDTO> = {
      PhoneInternational: data.phoneInternational,
      PhoneDDD: ddd,
      PhoneNumber: number
    };
    setUserData(userDTO);
    setCurrentStep(4);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex w-full flex-col gap-4 md:mt-2"
    >
      <div className="ml-2 flex flex-col items-start gap-0">
        <h4 className="h-8 text-3xl font-extrabold text-[#56381C]">
          Contato da
        </h4>
        <h4 className="h-10 text-4xl font-extralight text-[#AD4C24] italic">
          cafeteria
        </h4>
      </div>
      <div className="flex w-full items-start justify-start gap-2">
        <InputField
          name="phoneInternational"
          register={register}
          label="Código"
          required
          className="w-20"
          placeholder="Ex: 55"
        />
        <InputField
          name="phoneWithDDD"
          register={register}
          label="Telefone com DDD"
          formErrors={errors}
          className="flex-1"
          mask="(99) 99999-9999"
          required
          placeholder="Ex: 11998877665"
        />
      </div>
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
