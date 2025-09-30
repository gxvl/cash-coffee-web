"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import InputField from "@/components/InputField/inputField";
import { Button } from "@/components/ui/button";
import { SignUp5Form, SignUp5FormSchema } from "@/validations/signUp5";

export default function Register4() {
  const {
    register,
    formState: { errors }
  } = useForm<SignUp5Form>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignUp5FormSchema)
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex h-[86vh] w-full flex-col items-center justify-between gap-4 px-8 pt-10 md:px-44">
      <div>
        <ChevronLeft
          onClick={() => {
            router.back();
          }}
          className="h-6 w-6 text-[#AD4C24]"
          strokeWidth={4}
        />
        <div className="ml-2 flex flex-col items-start gap-8">
          <h4 className="h-8 text-3xl font-extrabold text-[#56381C]">
            Primeiro confirme seu email e em
          </h4>
          <h4 className="h-10 text-4xl font-extralight text-[#AD4C24] italic">
            seguida crie a conta
          </h4>
        </div>
      </div>
      <div className="flex w-full flex-col gap-6">
        <InputField
          name="password"
          register={register}
          formErrors={errors}
          placeholder="Crie uma senha"
          type={showPassword ? "text" : "password"}
          onSuffixClick={() => setShowPassword(!showPassword)}
          suffix={
            showPassword ? (
              <EyeClosed className="text-[#B35125]" />
            ) : (
              <Eye className="text-[#B35125]" />
            )
          }
        />
        <InputField
          name="confirmPassword"
          register={register}
          type={showPassword ? "text" : "password"}
          formErrors={errors}
          onSuffixClick={() => setShowPassword(!showPassword)}
          placeholder="Confirmar senha"
          suffix={
            showPassword ? (
              <EyeClosed className="text-[#B35125]" />
            ) : (
              <Eye className="text-[#B35125]" />
            )
          }
        />
        <div className="flex flex-col gap-3">
          <Button onClick={() => router.push("login")}>Continuar</Button>
          <p className="px-14 text-center text-xs font-bold text-[#53371A]">
            Crie uma senha com 6 digitos entre letras, números e caracteres.
          </p>
        </div>
      </div>
      <Image priority src={"/marca.png"} width={160} height={160} alt="marca" />
    </div>
  );
}
