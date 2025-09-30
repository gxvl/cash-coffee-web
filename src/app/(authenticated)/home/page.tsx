"use client";

import { useState } from "react";

import {
  Coffee,
  Mail,
  Plus,
  Settings,
  ClipboardList,
  BookOpenText,
  Star,
  Clock,
  BarChart3
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function HomePage() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const router = useRouter();
  const menu = [
    {
      name: "Pedidos",
      link: "/orders",
      icon: <ClipboardList className="size-7" size={40} />
    },
    {
      name: "Cardápio",
      link: "/menu",
      icon: <BookOpenText className="size-7" size={40} />
    },
    {
      name: "Cashbônus",
      link: "/cashbonus",
      icon: <Star className="size-7" size={40} />
    },
    {
      name: "Horário",
      link: "/schedule",
      icon: <Clock className="size-7" size={40} />
    },
    {
      name: "Relatório",
      link: "/report",
      icon: <BarChart3 className="size-7" size={40} />
    }
  ];

  return (
    <main className="flex h-screen flex-col gap-6 pt-10">
      <div className="flex items-center justify-center gap-10">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#B35125]">
          <Coffee className="text-white" />
          <div className="absolute right-0 bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#54361A]">
            <Plus className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-[#54361A]">Show Café</p>
            <Settings
              onClick={() => router.push("/settings/user")}
              className="text-[#B35125]"
            />
          </div>
          <Switch
            isOpen={isShopOpen}
            onCheckedChange={() => setIsShopOpen(!isShopOpen)}
          />
          <div className="flex items-center justify-between">
            <p className="border-b-2 border-[#B35125] text-xs font-bold">
              Complete o cadastro
            </p>
            <Mail className="text-[#B35125]" />
          </div>
        </div>
      </div>
      <div className="flex h-28 w-full flex-col items-center justify-center bg-[#B35125]">
        <p className="text-sm font-bold text-white">Vendas pelo CashCoffee</p>
        <div className="flex items-end gap-2 font-light text-white">
          <p className="font-bold">R$</p>
          <h3 className="text-5xl">30.000,00</h3>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {menu.map((item) => (
          <Button
            onClick={() => router.push(item.link)}
            className="mx-6 py-8"
            key={item.name}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-lg">{item.name}</span>
            </div>
          </Button>
        ))}
      </div>
    </main>
  );
}
