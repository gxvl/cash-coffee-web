import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { UserDTO } from "@/common/entities/user";
import { SignUpForm, SignUpFormSchema } from "@/validations/signUp";

import InputField from "../../InputField/inputField";
import { Button } from "../../ui/button";

export default function StepOne({
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
  } = useForm<SignUpForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignUpFormSchema)
  });

  // Remove máscara do CPF: "064.779.834-43" -> "06477983443"
  const unmaskCPF = (cpf?: string): string => {
    if (!cpf) return "";
    return cpf.replace(/\D/g, "");
  };

  const onSubmit = (data: SignUpForm) => {
    const userDTO: Partial<UserDTO> = {
      ResponsibleName: data.responsibleName,
      ResponsibleCPF: unmaskCPF(data.responsibleCPF),
      ResponsiblePhone: data.responsiblePhone,
      ResponsibleEmail: data.responsibleEmail,
      ResponsibleOccupation: data.responsibleOccupation,
      ResponsibleMonthlyIncome: parseFloat(data.responsibleMonthlyIncome),
      OriginApplication: 2,
      IsBarista: false,
      IsAmbassador: false
    };
    setUserData(userDTO);
    setCurrentStep(2);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex w-full flex-col gap-4 md:mt-2"
    >
      <div className="ml-2 flex flex-col items-start gap-0">
        <h4 className="h-8 text-3xl font-extrabold text-[#56381C]">
          Cadastro do
        </h4>
        <h4 className="h-10 text-4xl font-extralight text-[#AD4C24] italic">
          responsável
        </h4>
        <h4 className="h-8 text-3xl font-extrabold text-[#56381C]">
          pela cafeteria
        </h4>
      </div>
      <InputField
        name="responsibleName"
        register={register}
        label="Nome e sobrenome"
        required
        formErrors={errors}
        placeholder="Nome e sobrenome"
      />
      <InputField
        name="responsibleEmail"
        register={register}
        required
        formErrors={errors}
        label="Email"
        placeholder="Email"
      />
      <InputField
        name="responsiblePhone"
        register={register}
        label="Celular"
        formErrors={errors}
        mask="(99) 99999-9999"
        required
        placeholder="DDD + celular"
      />
      <InputField
        name="responsibleCPF"
        register={register}
        label="CPF"
        mask="999.999.999-99"
        formErrors={errors}
        required
        placeholder="CPF (somente números)"
      />
      <InputField
        name="responsibleOccupation"
        register={register}
        label="Ocupação"
        formErrors={errors}
        required
        placeholder="Ex: Sócio Administrador"
      />
      <InputField
        name="responsibleMonthlyIncome"
        register={register}
        label="Renda Mensal"
        formErrors={errors}
        required
        placeholder="Ex: 15000"
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
