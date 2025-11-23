"use client";

import { useState } from "react"; // Importado para gerenciar o estado de loading

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleQuestionMark, Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputField from "@/components/InputField/inputField";
import LoadingComponent from "@/components/LoadingComponent/loading";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext"; // Importado para acessar a função de login
import { ToastDealer } from "@/lib/utils";
import { SignInForm, SignInFormSchema } from "@/validations/signIn";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loading do botão
  const { login, loading, isAuthenticated } = useAuth(); // Pega a função de login do nosso contexto
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para controlar a visibilidade da senha

  const {
    register,
    handleSubmit, // Adicionado para lidar com a submissão do formulário
    formState: { errors, isValid }
  } = useForm<SignInForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignInFormSchema)
  });

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true);
    try {
      const response = await login({
        ...data,
        originApplication: 2
      });

      toast.success(
        ToastDealer(response.message) || "Você será redirecionado em breve."
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.Message ||
          "Credenciais inválidas. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex h-screen w-full flex-col items-center gap-24 px-4 pt-10">
      <Image priority src={"/marca.png"} width={160} height={160} alt="marca" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex w-full flex-col gap-4 px-4"
      >
        <InputField
          name="email"
          register={register}
          label="Login"
          formErrors={errors}
          placeholder="Digite seu email"
        />
        <InputField
          name="password"
          register={register}
          suffix={
            isPasswordVisible ? (
              <EyeClosed className="cursor-pointer text-[#B75427]" />
            ) : (
              <Eye className="cursor-pointer text-[#B75427]" />
            )
          }
          onSuffixClick={() => setIsPasswordVisible(!isPasswordVisible)}
          formErrors={errors}
          type={isPasswordVisible ? "text" : "password"}
          label="Senha"
          placeholder="******"
        />
        <Button type="submit" disabled={isLoading || !isValid} className="mt-2">
          {isLoading || loading || isAuthenticated ? (
            <LoadingComponent />
          ) : (
            "Entrar"
          )}
        </Button>
        <Link
          className="w-max place-self-center border-b-2 border-[#B75427] text-sm italic"
          href={"/forgot-password"}
        >
          Esqueci a senha
        </Link>
      </form>

      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-[#B75427]">Novo por aqui?</p>
        <Button
          onClick={() => (window.location.href = "/register")}
          className="w-full bg-[#54361C]"
        >
          Faça o cadastro da sua cafeteria
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
        </div>
        <CircleQuestionMark
          onClick={() => (window.location.href = "/questions")}
          className="h-10 w-10 place-self-center text-[#54361C]"
        />
      </div>
    </main>
  );
}
