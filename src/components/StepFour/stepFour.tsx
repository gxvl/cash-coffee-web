"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { UserDTO } from "@/common/entities/user";
import InputField from "@/components/InputField/inputField";
import { Button } from "@/components/ui/button";
import { createUser } from "@/services/userService";
import { SignUp4Form, SignUp4FormSchema } from "@/validations/signUp4";

import LoadingComponent from "../LoadingComponent/loading";

export default function StepFour({
  setUserData,
  userData
}: {
  setCurrentStep: (step: number) => void;
  setUserData: (data: UserDTO) => void;
  userData: UserDTO;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUp4Form>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignUp4FormSchema)
  });

  const onSubmit = async (data: SignUp4Form) => {
    console.log(data);
    setLoading(true);
    const userDTO: Partial<UserDTO> = {
      bankAccount: {
        bankCode: data.bank,
        bankBranchNumber: data.agency,
        bankBranchCheckDigit: data.agencyCode,
        bankAccountNumber: data.account,
        bankAccountCheckDigit: data.accountCode,
        bankAccountType: "checking"
      }
    };
    setUserData({
      ...userData,
      ...userDTO
    } as UserDTO);
    try {
      await createUser(userData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-[86vh] w-full flex-col items-start justify-between gap-4 px-8 pt-10 md:px-44"
    >
      <div>
        <div className="ml-2 flex flex-col items-start gap-0">
          <h4 className="h-8 text-3xl font-extrabold text-[#56381C]">
            Dados bancários
          </h4>
          <h4 className="h-10 text-4xl font-extralight text-[#AD4C24] italic">
            da cafeteria
          </h4>
        </div>
      </div>
      <div className="lex w-full flex-col gap-4">
        <InputField
          name="bank"
          register={register}
          label="Banco"
          formErrors={errors}
          placeholder="Banco"
        />
        <div className="flex gap-1">
          <InputField
            name="agency"
            register={register}
            label="Agência"
            placeholder="Agência"
            className="w-56 flex-1"
          />
          <InputField
            name="agencyCode"
            register={register}
            label="Código"
            formErrors={errors}
            placeholder="Código"
          />
        </div>
        <div className="flex gap-1">
          <InputField
            name="account"
            formErrors={errors}
            register={register}
            label="Conta"
            placeholder="Número da conta"
            className="w-56 flex-1"
          />
          <InputField
            name="accountCode"
            formErrors={errors}
            register={register}
            label="Código"
            placeholder="Código"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button type="submit">
          {loading ? <LoadingComponent /> : "Continuar"}
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
          <p className="text-sm font-bold">
            Garantimos a segurança dos seus dados.
          </p>
        </div>
      </div>
    </form>
  );
}
