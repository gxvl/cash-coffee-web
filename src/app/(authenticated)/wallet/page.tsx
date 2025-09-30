"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function WalletPage() {
  const router = useRouter();
  return (
    <main className="flex h-screen flex-col items-center gap-4 px-6 pt-20">
      <div className="flex w-full flex-col items-center justify-between gap-6 rounded-xl bg-[#EDEDEE] py-4">
        <p className="text-xs font-bold text-[#55381C]">
          Você já vendeu com a CashCoffee
        </p>
        <div className="flex items-end gap-1">
          <p className="mb-1 text-xs font-bold text-[#54361A]">R$</p>
          <h2 className="text-4xl font-bold text-[#54361A]">30.000,00</h2>
        </div>
        <Button className="h-10 w-56">Ver extrato</Button>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-6 rounded-xl bg-[#EDEDEE] py-4">
        <p className="text-xs font-bold text-[#55381C]">Valor a liberar</p>
        <div className="flex items-end gap-1">
          <p className="mb-1 text-xs font-bold text-[#54361A]">R$</p>
          <h2 className="text-4xl font-bold text-[#54361A]">18.000,00</h2>
        </div>
        <Button className="h-10 w-56">Ver previsão de resgate</Button>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-4 rounded-xl bg-[#EDEDEE] py-8">
        <p className="text-xs font-bold text-[#55381C]">
          Valor que já recebeu com Cashbônus
        </p>
        <div className="flex items-end gap-1">
          <p className="mb-1 text-xs font-bold text-[#54361A]">R$</p>
          <h2 className="text-4xl font-bold text-[#54361A]">30.000,00</h2>
        </div>
      </div>
      <Button
        onClick={() => router.push("/cashbonus")}
        variant={"brown"}
        className="mt-20 text-sm"
      >
        Venda mais oferecendo novos cashbônus!
      </Button>
    </main>
  );
}
