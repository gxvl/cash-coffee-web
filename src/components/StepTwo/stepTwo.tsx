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
  setUserData: (data: UserDTO) => void;
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

  const onSubmit = (data: SignUp2Form) => {
    const userDTO: Partial<UserDTO> = {
      ...data
    };
    setUserData({
      ...userDTO
    } as UserDTO);
    setCurrentStep(3);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start justify-center gap-4 px-8 pt-6 md:px-44"
    >
      <div className="ml-2 flex flex-col items-start gap-0">
        <h4 className="h-8 text-3xl font-extrabold text-[#56381C]">
          Cadastro da
        </h4>
        <h4 className="h-10 text-4xl font-extralight text-[#AD4C24] italic">
          sua cafeteria
        </h4>
      </div>
      <div className="mt-4 flex w-full flex-col gap-4 md:mt-2">
        <InputField
          name="cafeteriaName"
          register={register}
          label="Nome da cafeteria"
          formErrors={errors}
          placeholder="Nome"
        />
        <InputField
          name="cafeteriaEmail"
          register={register}
          label="Email da cafeteria"
          placeholder="Email"
        />
        <InputField
          name="cafeteriaPhone"
          register={register}
          label="Celular da cafeteria"
          formErrors={errors}
          placeholder="DDD + celular da cafeteria"
        />
        <InputField
          name="cnpj"
          register={register}
          label="CNPJ"
          formErrors={errors}
          placeholder="CNPJ (somente números)"
        />
        <InputField
          name="corporateReason"
          formErrors={errors}
          register={register}
          label="Razão social"
          placeholder="Razão social"
        />
        <div className="flex flex-col gap-3">
          <Button disabled={!isValid} className="mt-4">
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
      </div>
    </form>
  );
}
