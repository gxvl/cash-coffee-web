"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import CoffeeshopForm from "@/components/forms/coffeeshopForm";

export default function CoffeeshopSettingsPage() {
  const router = useRouter();

  return (
    <main className="flex h-full w-full flex-col gap-4 bg-white px-10 pt-12 pb-28">
      {/* Header */}
      <div className="flex flex-col">
        <ChevronLeft
          onClick={() => router.push("/home")}
          className="h-6 w-6 cursor-pointer text-[#B45326]"
          strokeWidth={4}
        />
        <p className="w-full text-center text-2xl font-semibold text-[#B45326]">
          Meu cadastro
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="div h-16 w-full rounded-full border-2">
        <div className="flex h-full w-full items-center rounded-full">
          <Link href="/settings/user" className="flex h-full flex-1">
            <div
              // Botão do Usuário está INATIVO
              className="flex h-full w-full cursor-pointer items-center justify-center rounded-l-full bg-white font-extrabold text-[#B45326]"
            >
              Responsável
            </div>
          </Link>
          <Link href="/settings/coffeeshop" className="flex h-full flex-1">
            <div
              // Botão da Cafeteria está ATIVO
              className="flex h-full w-full cursor-pointer items-center justify-center rounded-r-full bg-[#55371B] text-lg font-semibold text-white"
            >
              Cafeteria
            </div>
          </Link>
        </div>
      </div>

      {/* Renderiza o formulário da cafeteria */}
      <CoffeeshopForm />
    </main>
  );
}
