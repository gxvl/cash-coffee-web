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
  setUserData: (data: UserDTO) => void;
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
    const userDTO: Partial<UserDTO> = {
      address: {
        street: data.street,
        number: data.number,
        complement: data.complement || "",
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.uf,
        zipCode: data.cep,
        latitude: 0,
        longitude: 0
      }
    };
    setUserData({
      ...userDTO
    } as UserDTO);
    setCurrentStep(4);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start justify-center gap-4 px-4 pt-6"
    >
      <div className="ml-2 flex flex-col items-start gap-0">
        <h4 className="h-8 text-3xl font-extrabold text-[#56381C]">
          Endereço da
        </h4>
        <h4 className="h-10 text-4xl font-extralight text-[#AD4C24] italic">
          sua cafeteria
        </h4>
      </div>
      <div className="mt-4 flex w-full flex-col gap-4 md:mt-2">
        <InputField
          name="cep"
          register={register}
          label="CEP"
          formErrors={errors}
          mask="99999-999"
          placeholder="Ex.: 52030-150"
        />
        <div className="flex gap-1">
          <InputField
            name="street"
            register={register}
            label="Rua da cafeteria"
            placeholder="Rua"
            className="w-64 flex-1"
          />
          <InputField
            name="number"
            register={register}
            label="Número"
            formErrors={errors}
            placeholder="N°"
          />
        </div>
        <InputField
          name="complement"
          register={register}
          label="Complemento"
          formErrors={errors}
          placeholder="Complemento"
        />
        <InputField
          name="neighborhood"
          formErrors={errors}
          register={register}
          label="Bairro"
          placeholder="Bairro"
        />
        <div className="flex gap-1">
          <InputField
            name="city"
            formErrors={errors}
            register={register}
            label="Cidade"
            placeholder="Cidade"
            className="w-56 flex-1"
          />
          <InputField
            name="uf"
            maxLength={2}
            formErrors={errors}
            register={register}
            label="UF"
            size={40}
            placeholder="UF"
          />
        </div>
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
