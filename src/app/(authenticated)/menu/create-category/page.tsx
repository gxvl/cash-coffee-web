"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import Input from "@/components/Input/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/mockup/constants";

export default function CreateCategoryPage() {
  const router = useRouter();

  return (
    <main className="relative flex h-full flex-col items-start justify-start gap-6 px-10 pt-12">
      <ChevronLeft
        onClick={() => {
          router.back();
        }}
        className="h-6 w-6 text-[#AD4C24]"
        strokeWidth={4}
      />
      <h4 className="text-3xl font-semibold text-[#AD4C24]">Criar categoria</h4>

      <Input placeholder="Nome da categoria" />
      <Button variant={"brown"} className="w-full">
        Criar categoria
      </Button>
      <div className="flex w-full flex-col gap-2">
        <p className="w-full text-center text-sm font-bold text-[#573418]">
          Todas as categorias
        </p>
        <div className="flex w-full flex-col gap-2 pb-32">
          {categories.map((item) => (
            <div
              className="flex w-full justify-between border-b border-[#8a4f18] py-4"
              key={item.id}
            >
              <div className="flex items-center gap-4">
                <span className="text-base">{item.name}</span>
              </div>
              <Button
                className="rounded-xl border-none px-7"
                variant={"brown"}
                size={"sm"}
              >
                Editar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
