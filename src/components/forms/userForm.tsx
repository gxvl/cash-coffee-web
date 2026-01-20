"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputField from "@/components/InputField/inputField";
import LoadingComponent from "@/components/LoadingComponent/loading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useGetUser } from "@/hooks/queries/useGetUser";
import { useUpdateUser } from "@/hooks/queries/useUpdateUser";
import { UserForm, UserFormSchema } from "@/validations/userForm";

export default function UserFormComponent() {
  const [userId, setUserId] = useState<string | null>(null);

  const { data: user, isLoading } = useGetUser(userId || "");
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, dirtyFields }
  } = useForm<UserForm>({
    resolver: zodResolver(UserFormSchema)
  });

  // Debug: mostra erros de validação
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Erros de validação:", errors);
    }
  }, [errors]);

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  useEffect(() => {
    if (user) {
      setValue("name", user.ResponsibleName || "");
      setValue("email", user.ResponsibleEmail || "");
      // Reconstrói o telefone completo com DDD para exibição
      const fullPhone =
        user.PhoneDDD && user.ResponsiblePhone
          ? `${user.PhoneDDD}${user.PhoneNumber}`
          : "";
      setValue("phoneNumber", fullPhone);
      setValue("cpf", user.ResponsibleCPF || "");
      // Converte gender numérico (0-3) para string
      if (user.Gender !== undefined) {
        setValue("gender", user.Gender);
      }
    }
  }, [user, setValue]);

  const onSubmit = (data: UserForm) => {
    if (!user) return;
    // Extrai DDD e número do telefone (mesmo formato do stepThree)
    let responsiblePhone = user.ResponsiblePhone;

    if (dirtyFields.phoneNumber && data.phoneNumber) {
      const cleanPhone = data.phoneNumber.replace(/\D/g, ""); // Remove caracteres não numéricos
      responsiblePhone = cleanPhone;
    }

    // Remove máscara do CPF
    const cleanCpf =
      dirtyFields.cpf && data.cpf
        ? data.cpf.replace(/\D/g, "")
        : user.ResponsibleCPF;

    // Monta objeto base com todos os campos obrigatórios do usuário (UserUpdateDTO)
    const updatedUser = {
      UserId: userId,
      OriginApplication: user.OriginApplication,
      Alias: user.Alias,
      Gender:
        dirtyFields.gender && data.gender !== undefined
          ? data.gender
          : user.Gender,
      Name: user.Name,
      UserType: user.UserType,
      Email: user.Email,
      Password: user.Password,
      PhoneInternational: user.PhoneInternational,
      PhoneDDD: user.PhoneDDD,
      PhoneNumber: user.PhoneNumber,
      CNPJ: user.CNPJ,
      CPF: user.CPF,
      IsBarista: user.IsBarista,
      IsAmbassador: user.IsAmbassador,
      IsOpenShop: user.IsOpenShop,
      ChargeTaxFee: user.ChargeTaxFee,
      DateOfBirth: user.DateOfBirth,
      ResponsibleName: dirtyFields.name ? data.name : user.ResponsibleName,
      ResponsibleCPF: cleanCpf,
      ResponsiblePhone: responsiblePhone,
      ResponsibleEmail: dirtyFields.email ? data.email : user.ResponsibleEmail,
      ResponsibleOccupation: user.ResponsibleOccupation,
      ResponsibleMonthlyIncome: user.ResponsibleMonthlyIncome,
      AnnualRevenue: user.AnnualRevenue,
      Address: {
        Street: (dirtyFields.street ? data.street : user.Address?.Street) || "",
        Number: (dirtyFields.number ? data.number : user.Address?.Number) || "",
        Complement:
          (dirtyFields.complement
            ? data.complement
            : user.Address?.Complement) || "",
        Neighborhood:
          (dirtyFields.neighborhood
            ? data.neighborhood
            : user.Address?.Neighborhood) || "",
        ZipCode:
          (dirtyFields.zipCode ? data.zipCode : user.Address?.ZipCode) || "",
        City: (dirtyFields.city ? data.city : user.Address?.City) || "",
        State: (dirtyFields.state ? data.state : user.Address?.State) || "",
        Latitude: user.Address?.Latitude || 0,
        Longitude: user.Address?.Longitude || 0
      },
      BankAccount: user.BankAccount,
      AutomaticAnticipationSettings: user.AutomaticAnticipationSettings,
      TransferSettings: user.TransferSettings
    };

    console.log("Dados sendo enviados:", updatedUser);
    console.log("Campos modificados:", dirtyFields);

    updateUser(updatedUser, {
      onSuccess: () => {
        toast.success("Dados atualizados com sucesso!");
      },
      onError: (error) => {
        console.error("Erro completo:", error);
        toast.error("Erro ao atualizar dados");
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
      <div>
        <InputField
          label="Nome"
          placeholder="Digite seu nome"
          name="name"
          register={register}
          formErrors={errors}
        />
      </div>

      <div>
        <InputField
          label="Email"
          placeholder="Digite seu email"
          name="email"
          register={register}
          formErrors={errors}
        />
      </div>

      <div>
        <InputField
          label="Telefone"
          placeholder="Digite seu telefone"
          name="phoneNumber"
          mask="(99) 99999-9999"
          register={register}
          formErrors={errors}
        />
      </div>

      <div>
        <InputField
          label="CPF"
          placeholder="Digite seu CPF"
          mask="999.999.999-99"
          name="cpf"
          register={register}
          formErrors={errors}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm text-black">Sexo</p>
        <Select
          value={watch("gender")?.toString()}
          onValueChange={(value) => setValue("gender", parseInt(value))}
        >
          <SelectTrigger className="w-full rounded-lg border-[#AD4C24] py-6 text-sm text-[#B45326] shadow-none placeholder:text-[#BB5226]">
            <SelectValue placeholder="Sexo" />
          </SelectTrigger>
          <SelectContent className="text-lg">
            <SelectItem value="0">Masculino</SelectItem>
            <SelectItem value="1">Feminino</SelectItem>
            <SelectItem value="2">Não-binário</SelectItem>
            <SelectItem value="3">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isPending} className="mt-4">
        {isPending ? "Salvando..." : "Salvar alterações"}
      </Button>
    </form>
  );
}
