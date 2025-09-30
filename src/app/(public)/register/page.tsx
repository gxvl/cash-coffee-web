"use client";

import { useState } from "react";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { nullUserData, UserDTO } from "@/common/entities/user";
import StepFour from "@/components/StepFour/stepFour";
import StepOne from "@/components/StepOne/stepOne";
import StepThree from "@/components/StepThree/stepThree";
import StepTwo from "@/components/StepTwo/stepTwo";

export default function Register() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(nullUserData);

  const updateUserData = (newData: Partial<UserDTO>) => {
    setUserData((previousData) => ({
      ...previousData, // Mantém os dados dos passos anteriores
      ...newData // Adiciona os novos dados
    }));
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-4 px-8 pt-6 md:px-44">
      <ChevronLeft
        onClick={handleBack}
        className="h-6 w-6 text-[#AD4C24]"
        strokeWidth={4}
      />
      {currentStep === 1 && (
        <StepOne setUserData={updateUserData} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 2 && (
        <StepTwo setUserData={updateUserData} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 3 && (
        <StepThree
          setUserData={updateUserData}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 4 && (
        <StepFour
          setUserData={updateUserData}
          setCurrentStep={setCurrentStep}
          userData={userData}
        />
      )}
    </div>
  );
}
