"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputField from "@/components/InputField/inputField";
import LoadingComponent from "@/components/LoadingComponent/loading";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { ToastDealer } from "@/lib/utils";
import {
  getUserByDocument,
  newPassword,
  passwordRecovery,
  ValidateCode
} from "@/services/userService";
import { CodeForm } from "@/validations/code";
import { ForgotForm, ForgotFormSchema } from "@/validations/forgot";
import {
  NewPasswordForm,
  NewPasswordFormSchema
} from "@/validations/newPassword";

interface StepProps {
  onNext: () => void;
}

// =================================================================
// STEP 1: CNPJ INPUT COMPONENT
// =================================================================
const Step1CNPJ = ({
  onNext,
  setUserEmail,
  setUserId
}: StepProps & {
  setUserEmail: (email: string) => void;
  setUserId: (id: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<ForgotForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ForgotFormSchema)
  });

  const unmaskedCNPJ = watch("cnpj")?.replace(/\D/g, "") || "";

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const getResponse = await getUserByDocument(2, unmaskedCNPJ);
      const parsedGetResponse = JSON.parse(getResponse.data.data);
      setUserEmail(parsedGetResponse.Email);
      setUserId(parsedGetResponse.UserId);
      const response = await passwordRecovery(2, unmaskedCNPJ);
      toast.success(ToastDealer(response.data.message));
      onNext();
      setIsLoading(false);
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : undefined;
      toast.error(ToastDealer(errorMessage || "") || "Erro inesperado");
      setIsLoading(false);
    }
    // onNext(); // Proceed to the next step
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-10 px-4"
    >
      <h4 className="text-center text-xl text-[#56381C]">
        Digite o CNPJ cadastrado
      </h4>
      <div className="flex w-full flex-col">
        <InputField
          name="cnpj"
          mask="99.999.999/9999-99"
          register={register}
          formErrors={errors}
          className="w-full"
        />
        <p className="text-center text-sm text-[#AD4C24]">Apenas números</p>
      </div>
      <Button type="submit" className="mt-2" disabled={!isValid}>
        {isLoading ? <LoadingComponent /> : "Enviar código"}
      </Button>
    </form>
  );
};

// =================================================================
// STEP 2: METHOD SELECTION COMPONENT
// // =================================================================
// const Step2ChooseMethod = ({ onNext }: StepProps) => (
//   <div className="flex w-full flex-col gap-2 px-4">
//     <h4 className="text-center text-xl text-[#56381C]">Criar nova senha</h4>
//     <Button onClick={onNext} className="mt-2">
//       Pelo email ost****@vilecafe.com
//     </Button>
//   </div>
// );

// =================================================================
// STEP 3: CODE INPUT COMPONENT
// =================================================================
const Step3EnterCode = ({
  onNext,
  userEmail
}: StepProps & { userEmail: string }) => {
  const [code, setCode] = useState("");

  const onSubmit = async (data: CodeForm) => {
    try {
      const response = await ValidateCode(userEmail, Number(code));
      toast.success(ToastDealer(response.data.message));
      onNext();
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : undefined;
      toast.error(ToastDealer(errorMessage || "") || "Erro inesperado");
      // Stop here if there's an error
    }
    // onNext(); // Proceed to the final step
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-4">
      <h4 className="text-center text-xl text-[#56381C]">
        Código de autorização
      </h4>
      <p className="text-center text-sm text-[#AD4C24]">
        Digite o código com 4 números enviado agora para o email da cafeteria.
      </p>
      <InputOTP value={code} onChange={setCode} size={32} maxLength={8}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        type="submit"
        className="mt-2"
        disabled={!code || code.length < 8}
        onClick={() => onSubmit({ code })}
      >
        Confirmar código
      </Button>
    </div>
  );
};

// =================================================================
// STEP 4: SUCCESS COMPONENT
// =================================================================
interface Step4Props {
  onFinish: () => void;
}

const Step4Success = ({
  onFinish,
  userId,
  userEmail
}: Step4Props & { userId: string | null; userEmail: string }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<NewPasswordForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(NewPasswordFormSchema)
  });

  const onSubmit = async (data: NewPasswordForm) => {
    setIsLoading(true);
    if (!userId) return;
    try {
      const response = await newPassword(userId, userEmail, data.password);
      toast.success(ToastDealer(response.data.message));
      setIsLoading(false);
      onFinish();
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : undefined;
      toast.error(ToastDealer(errorMessage || "") || "Erro inesperado");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-2 px-4"
    >
      <h4 className="text-center text-xl text-[#56381C]">
        Escolha uma nova senha
      </h4>
      <div className="my-4 flex flex-col gap-2">
        <InputField
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Nova senha"
          register={register}
          formErrors={errors}
          onSuffixClick={() => setIsPasswordVisible(!isPasswordVisible)}
          suffix={
            isPasswordVisible ? (
              <EyeClosed className="cursor-pointer text-[#B75427]" />
            ) : (
              <Eye className="cursor-pointer text-[#B75427]" />
            )
          }
          className="w-full"
          // register={register} --- IGNORE ---
          // formErrors={errors} --- IGNORE ---
        />
        <InputField
          name="confirmPassword"
          register={register}
          formErrors={errors}
          onSuffixClick={() => setIsPasswordVisible(!isPasswordVisible)}
          type={isPasswordVisible ? "text" : "password"}
          suffix={
            isPasswordVisible ? (
              <EyeClosed className="cursor-pointer text-[#B75427]" />
            ) : (
              <Eye className="cursor-pointer text-[#B75427]" />
            )
          }
          placeholder="Confirme a nova senha"
          className="w-full"
          // register={register} --- IGNORE ---
          // formErrors={errors} --- IGNORE ---
        />
      </div>
      <Button type="submit" disabled={!isValid} className="mt-4">
        {isLoading ? <LoadingComponent /> : "Alterar senha"}
      </Button>
    </form>
  );
};

const Step5Success = ({ onFinish }: Step4Props) => (
  <div className="flex w-full flex-col items-center justify-center gap-6 px-4">
    <h4 className="text-center text-xl text-[#56381C]">
      Senha alterada com sucesso!
    </h4>
    <p className="text-center text-sm text-[#AD4C24]">
      Agora você já pode usar sua nova senha para entrar no sistema.
    </p>
    <Button type="submit" className="mt-2" onClick={onFinish}>
      Ir para o login
    </Button>
  </div>
);

// =================================================================
// MAIN PARENT COMPONENT
// =================================================================
export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleFinish = () => router.push("/login");

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1CNPJ
            onNext={handleNext}
            setUserEmail={setUserEmail}
            setUserId={setUserId}
          />
        );
      // case 2:
      //   return <Step2ChooseMethod onNext={handleNext} />;
      case 2:
        return <Step3EnterCode onNext={handleNext} userEmail={userEmail} />;
      case 3:
        return (
          <Step4Success
            onFinish={handleNext}
            userId={userId}
            userEmail={userEmail}
          />
        );
      case 4:
        return <Step5Success onFinish={handleFinish} />;
      default:
        return (
          <Step1CNPJ
            setUserEmail={setUserEmail}
            setUserId={setUserId}
            onNext={handleNext}
          />
        );
    }
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-24 px-4 pt-24">
      {renderCurrentStep()}
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
