"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputField from "@/components/InputField/inputField";
import LoadingComponent from "@/components/LoadingComponent/loading";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/queries/useGetUser";
import { useUpdateUser } from "@/hooks/queries/useUpdateUser";
import {
  CoffeeshopForm,
  CoffeeshopFormSchema
} from "@/validations/coffeeshopForm";

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export default function CoffeeshopFormComponent() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);

  const { data: user, isLoading } = useGetUser(userId || "");
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CoffeeshopForm>({
    resolver: zodResolver(CoffeeshopFormSchema)
  });

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  useEffect(() => {
    if (user) {
      setValue("coffeeshopName", user.Name || "");
      setValue("cnpj", user.CNPJ || "");
      setValue("email", user.Email || "");
      setValue("phoneNumber", user.PhoneNumber || "");
      setValue("zipCode", user.Address.ZipCode || "");
      setValue("street", user.Address.Street || "");
      setValue("number", user.Address.Number || "");
      setValue("state", user.Address.State || "");
      setValue("city", user.Address.City || "");
      setValue("neighborhood", user.Address.Neighborhood || "");
    }
  }, [user, setValue]);

  const handleCepBlur = async () => {
    const cep = watch("zipCode");
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
      setValue("state", data.uf);

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

  // Remove máscara do CNPJ: "12.345.678/0001-90" -> "12345678000190"
  const unmaskCNPJ = (cnpj?: string): string => {
    if (!cnpj) return "";
    return cnpj.replace(/\D/g, "");
  };

  const onSubmit = (data: CoffeeshopForm) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      Name: data.coffeeshopName,
      CNPJ: unmaskCNPJ(data.cnpj),
      Email: data.email,
      PhoneNumber: data.phoneNumber,
      Address: {
        ...user.Address,
        ZipCode: data.zipCode,
        Street: data.street,
        Number: data.number,
        State: data.state,
        City: data.city,
        Neighborhood: data.neighborhood
      }
    };

    updateUser(updatedUser, {
      onSuccess: () => {
        toast.success("Dados da cafeteria atualizados com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao atualizar dados da cafeteria");
      }
    });
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputField
        label="Nome da Cafeteria"
        placeholder="Digite o nome do estabelecimento"
        name="coffeeshopName"
        register={register}
        formErrors={errors}
      />
      <InputField
        label="CNPJ"
        placeholder="Digite o CNPJ"
        name="cnpj"
        register={register}
        formErrors={errors}
      />
      <InputField
        label="Email de Contato"
        placeholder="Digite o email comercial"
        name="email"
        register={register}
        formErrors={errors}
      />
      <InputField
        label="Telefone Comercial"
        placeholder="Digite o telefone de contato"
        name="phoneNumber"
        register={register}
        formErrors={errors}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-normal">CEP</label>
        <input
          {...register("zipCode", {
            onBlur: handleCepBlur
          })}
          className="ring-offset-primary-50 focus-within:ring-primary-50 flex h-11 w-full items-center gap-1 rounded-[10px] border border-[#AD4C24] px-3 text-base text-black outline-none placeholder:text-sm placeholder:text-[#BB5226]"
          placeholder="Ex.: 52030-150"
          disabled={loadingCep}
        />
        {errors.zipCode && (
          <span className="text-sm text-red-500">{errors.zipCode.message}</span>
        )}
      </div>
      <InputField
        label="Endereço"
        placeholder="Digite o endereço"
        name="street"
        register={register}
        formErrors={errors}
      />
      <InputField
        label="Número"
        placeholder="Digite o número do endereço"
        name="number"
        register={register}
        formErrors={errors}
      />
      <InputField
        label="Estado"
        placeholder="Digite o estado"
        name="state"
        register={register}
        formErrors={errors}
      />
      <InputField
        label="Cidade"
        placeholder="Digite a cidade"
        name="city"
        register={register}
        formErrors={errors}
      />
      <InputField
        label="Bairro"
        placeholder="Digite o bairro"
        name="neighborhood"
        register={register}
        formErrors={errors}
      />

      <Button type="submit" disabled={isPending} className="mt-4">
        {isPending ? "Salvando..." : "Salvar alterações"}
      </Button>
    </form>
  );
}
