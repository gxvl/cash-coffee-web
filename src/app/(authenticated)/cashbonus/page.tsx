"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { items } from "@/lib/mockup/constants";

export default function CashbonusPage() {
  const [filter, setFilter] = useState("all");

  const router = useRouter();

  return (
    <main className="relative flex h-screen flex-col items-center justify-start px-10 pt-12">
      {/* <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-full rounded-xl border-[#54361A] py-6 text-lg">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent className="text-lg">
          <SelectItem value="all">Todo o cardápio</SelectItem>
          <SelectItem value="sweets">Doces</SelectItem>
          <SelectItem value="coffee">Café</SelectItem>
          <SelectItem value="beverages">Bebidas</SelectItem>
        </SelectContent>
      </Select> */}
      <div className="flex w-full flex-col gap-2">
        {items
          .filter((item) => item.cashbonus === true)
          .map((item) => (
            <div
              className="flex w-full justify-between border-b border-[#8a4f18] py-4"
              key={item.id}
            >
              <div className="flex items-center gap-4">
                <Checkbox checked className="h-5 w-5" />
                <span className="text-base">{item.name}</span>
              </div>
              <Button className="rounded-xl border-none px-7" size={"sm"}>
                Editar
              </Button>
            </div>
          ))}
      </div>
      <p className="pt-6 pb-2 text-lg font-bold text-[#B35326]">
        Produtos fora do cashbônus
      </p>
      <div className="flex w-full flex-col gap-2 pb-44">
        {items
          .filter((item) => item.cashbonus === false)
          .map((item) => (
            <div
              className="flex w-full justify-between border-b border-[#8a4f18] py-4"
              key={item.id}
            >
              <div className="flex items-center gap-4">
                <Checkbox className="h-5 w-5" />
                <span className="text-base">{item.name}</span>
              </div>
              <Button className="rounded-xl border-none px-7" size={"sm"}>
                Editar
              </Button>
            </div>
          ))}
      </div>
      <div className="fixed bottom-0 flex h-[20vh] w-full justify-center gap-2 py-4 backdrop-blur-md">
        <Button onClick={() => router.push("/menu/create-product")}>
          Cadastrar produto
        </Button>
        <Button onClick={() => router.push("/menu/create-category")}>
          Criar categoria
        </Button>
      </div>
    </main>
  );
}
