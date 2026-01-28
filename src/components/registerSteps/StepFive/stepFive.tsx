"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { UserDTO } from "@/common/entities/user";
import InputField from "@/components/InputField/inputField";
import { Button } from "@/components/ui/button";
import { createUser } from "@/services/userService";
import {
  BankAccountForm,
  BankAccountFormSchema
} from "@/validations/bankAccount";

import LoadingComponent from "../../LoadingComponent/loading";

export default function StepFive({
  setUserData,
  userData
}: {
  setCurrentStep: (step: number) => void;
  setUserData: (data: Partial<UserDTO>) => void;
  userData: UserDTO;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<BankAccountForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(BankAccountFormSchema)
  });

  const onSubmit = async (data: BankAccountForm) => {
    setLoading(true);
    const userDTO: Partial<UserDTO> = {
      BankAccount: {
        BankCode: data.bankCode,
        BankBranchNumber: data.bankBranchNumber,
        BankBranchCheckDigit: data.bankBranchCheckDigit,
        BankAccountNumber: data.bankAccountNumber,
        BankAccountCheckDigit: data.bankAccountCheckDigit,
        BankAccountType: data.bankAccountType,
        PixKey: data.pixKey ?? ""
      }
    };

    const finalUserData: UserDTO = {
      ...userData,
      BankAccount: {
        ...userDTO.BankAccount!,
        PixKey: data.pixKey || ""
      },
      TransferSettings: {
        ...userData.TransferSettings,
        TransferStatementDescriptor: `CASHCOFFEE*${userData.Alias.toUpperCase()}`
      }
    };

    setUserData(userDTO);

    console.log("Enviando dados:", finalUserData);

    try {
      const response = await createUser(finalUserData);
      console.log("Resposta do servidor:", response);

      if (response.status === 200 || response.status === 201) {
        console.log("Mostrando toast de sucesso");
        toast.success("Conta criada com sucesso!", {
          duration: 3000
        });
        setTimeout(() => {
          console.log("Redirecionando para login");
          router.push("/login");
        }, 2000);
      }
    } catch (error: unknown) {
      console.error("Erro ao criar conta:", error);
      const errorMessage =
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (error as { message?: string })?.message ||
        "Erro ao criar conta. Tente novamente.";
      toast.error("Erro ao criar conta", {
        description: errorMessage,
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex w-full flex-col gap-4 md:mt-2"
    >
      <div className="ml-2 flex flex-col items-start gap-0">
        <h4 className="h-8 text-3xl font-extrabold text-[#56381C]">
          Dados bancários
        </h4>
        <h4 className="h-10 text-4xl font-extralight text-[#AD4C24] italic">
          da cafeteria
        </h4>
      </div>
      <InputField
        name="bankCode"
        register={register}
        label="Código do Banco"
        formErrors={errors}
        required
        placeholder="Ex: 001"
      />
      <div className="flex gap-1">
        <InputField
          name="bankBranchNumber"
          register={register}
          label="Agência"
          placeholder="Agência"
          formErrors={errors}
          required
          className="w-56 flex-1"
        />
        <InputField
          name="bankBranchCheckDigit"
          register={register}
          label="Dígito"
          formErrors={errors}
          required
          placeholder="Dígito"
        />
      </div>
      <div className="flex gap-1">
        <InputField
          name="bankAccountNumber"
          formErrors={errors}
          register={register}
          required
          label="Conta"
          placeholder="Número da conta"
          className="w-56 flex-1"
        />
        <InputField
          name="bankAccountCheckDigit"
          formErrors={errors}
          register={register}
          required
          label="Dígito"
          placeholder="Dígito"
        />
      </div>
      <InputField
        name="bankAccountType"
        register={register}
        label="Tipo de Conta"
        formErrors={errors}
        required
        placeholder="Ex: Checking ou Savings"
      />
      <InputField
        name="pixKey"
        register={register}
        label="Chave PIX"
        formErrors={errors}
        placeholder="Chave PIX (opcional)"
      />
      <div className="flex flex-col gap-3">
        <Button disabled={!isValid} type="submit" className="mt-4">
          {loading ? <LoadingComponent /> : "Finalizar Cadastro"}
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
