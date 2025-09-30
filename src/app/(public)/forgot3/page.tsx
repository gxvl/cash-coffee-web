"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import InputField from "@/components/InputField/inputField";
import { Button } from "@/components/ui/button";
import { CodeForm, CodeFormSchema } from "@/validations/code";

export default function Forgot3Page() {
  const router = useRouter();

  const {
    register,
    formState: { errors }
  } = useForm<CodeForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(CodeFormSchema)
  });

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-24 px-4 pt-24">
      <div className="flex w-full flex-col gap-6 px-4">
        <h4 className="text-center text-xl text-[#56381C]">
          Código de autorização
        </h4>
        <p className="text-center text-sm text-[#AD4C24]">
          Digite o código com 4 números enviado agora para o email da
          cafeteria.{" "}
        </p>
        <InputField
          register={register}
          mask="9999"
          name="code"
          formErrors={errors}
          className="w-full text-center"
        />
        <Button onClick={() => router.push("/forgot4")} className="mt-2">
          Confirmar código
        </Button>
      </div>
      <Image
        className="mt-32"
        priority
        src={"/marca.png"}
        width={160}
        height={160}
        alt="marca"
      />
    </main>
  );
}
