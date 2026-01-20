"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { UserDTO } from "@/common/entities/user";
import InputField from "@/components/InputField/inputField";
import { Button } from "@/components/ui/button";
import { AddressForm, AddressFormSchema } from "@/validations/address";

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export default function StepFour({
  setUserData,
  setCurrentStep
}: {
  setCurrentStep: (step: number) => void;
  setUserData: (data: Partial<UserDTO>) => void;
}) {
  const [loadingCep, setLoadingCep] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm<AddressForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(AddressFormSchema)
  });

  const handleCepBlur = async () => {
    const cep = watch("cep");
    if (!cep) return;

    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    setLoadingCep(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );
      const data: ViaCEPResponse = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado", {
          description: "Verifique o CEP digitado e tente novamente."
        });
        return;
      }

      setValue("street", data.logradouro);
      setValue("neighborhood", data.bairro);
      setValue("city", data.localidade);
      setValue("uf", data.uf);
      if (data.complemento) {
        setValue("complement", data.complemento);
      }

      toast.success("CEP encontrado!", {
        description: "Endereço preenchido automaticamente."
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      toast.error("Erro ao buscar CEP", {
        description: "Não foi possível buscar o endereço. Tente novamente."
      });
    } finally {
      setLoadingCep(false);
    }
  };

  const onSubmit = (data: AddressForm) => {
    const userDTO: Partial<UserDTO> = {
      Address: {
        Street: data.street,
        Number: data.number,
        Complement: data.complement || "",
        Neighborhood: data.neighborhood,
        City: data.city,
        State: data.uf,
        ZipCode: data.cep,
        Latitude: -23.561414,
        Longitude: -46.655881
      }
    };
    setUserData(userDTO);
    setCurrentStep(5);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex w-full flex-col gap-4 md:mt-2"
    >
      <div className="ml-2 flex flex-col items-start gap-0">
        <h4 className="h-8 text-3xl font-extrabold text-[#56381C]">
          Endereço da
        </h4>
        <h4 className="h-10 text-4xl font-extralight text-[#AD4C24] italic">
          sua cafeteria
        </h4>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-normal">CEP</label>
        <input
          {...register("cep", {
            onBlur: handleCepBlur
          })}
          className="ring-offset-primary-50 focus-within:ring-primary-50 flex h-11 w-full items-center gap-1 rounded-[10px] border border-[#AD4C24] px-3 text-base text-black outline-none placeholder:text-sm placeholder:text-[#BB5226]"
          placeholder="Ex.: 52030-150"
          disabled={loadingCep}
        />
        {errors.cep && (
          <span className="text-sm text-red-500">{errors.cep.message}</span>
        )}
      </div>
      <div className="flex gap-1">
        <InputField
          name="street"
          register={register}
          label="Rua da cafeteria"
          placeholder="Rua"
          formErrors={errors}
          required
          className="w-64 flex-1"
        />
        <InputField
          name="number"
          register={register}
          label="Número"
          formErrors={errors}
          required
          placeholder="N°"
        />
      </div>
      <InputField
        name="complement"
        register={register}
        label="Complemento"
        formErrors={errors}
        placeholder="Complemento (opcional)"
      />
      <InputField
        name="neighborhood"
        formErrors={errors}
        register={register}
        required
        label="Bairro"
        placeholder="Bairro"
      />
      <div className="flex gap-1">
        <InputField
          name="city"
          formErrors={errors}
          register={register}
          required
          label="Cidade"
          placeholder="Cidade"
          className="w-56 flex-1"
        />
        <InputField
          name="uf"
          maxLength={2}
          formErrors={errors}
          register={register}
          required
          label="UF"
          placeholder="UF"
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
