"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ConfirmationModal } from "@/components/confirmationModal/confirmationModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function MenuPage() {
  const [filter, setFilter] = useState("all");
  const items = [
    { id: 1, name: "Café Gelado", category: "coffee" },
    { id: 2, name: "Bolo de Chocolate", category: "sweets" },
    { id: 3, name: "Suco de Laranja", category: "beverages" },
    { id: 4, name: "Cappuccino", category: "coffee" },
    { id: 5, name: "Torta de Limão", category: "sweets" },
    { id: 6, name: "Chá Gelado", category: "beverages" },
    { id: 7, name: "Brownie", category: "sweets" },
    { id: 8, name: "Latte", category: "coffee" },
    { id: 9, name: "Água com Gás", category: "beverages" },
    { id: 10, name: "Muffin de Mirtilo", category: "sweets" },
    { id: 11, name: "Espresso", category: "coffee" },
    { id: 12, name: "Croissant", category: "sweets" },
    { id: 13, name: "Refrigerante", category: "beverages" },
    { id: 14, name: "Mocha", category: "coffee" },
    { id: 15, name: "Pudim", category: "sweets" },
    { id: 16, name: "Chá Quente", category: "beverages" },
    { id: 17, name: "Affogato", category: "coffee" },
    { id: 18, name: "Brigadeiro", category: "sweets" },
    { id: 19, name: "Smoothie de Morango", category: "beverages" },
    { id: 20, name: "Macchiato", category: "coffee" },
    { id: 21, name: "Cookie de Chocolate", category: "sweets" },
    { id: 22, name: "Água Mineral", category: "beverages" },
    { id: 23, name: "Café com Leite", category: "coffee" },
    { id: 24, name: "Cheesecake", category: "sweets" },
    { id: 25, name: "Chá de Hibisco", category: "beverages" },
    { id: 26, name: "Ristretto", category: "coffee" },
    { id: 27, name: "Palha Italiana", category: "sweets" },
    { id: 28, name: "Suco de Uva", category: "beverages" },
    { id: 29, name: "Americano", category: "coffee" },
    { id: 30, name: "Donut", category: "sweets" },
    { id: 31, name: "Chá de Camomila", category: "beverages" },
    { id: 32, name: "Café Turco", category: "coffee" },
    { id: 33, name: "Torta de Maçã", category: "sweets" },
    { id: 34, name: "Suco Detox", category: "beverages" },
    { id: 35, name: "Café Vienense", category: "coffee" },
    { id: 36, name: "Pão de Mel", category: "sweets" },
    { id: 37, name: "Chá Verde", category: "beverages" },
    { id: 38, name: "Café Irlandês", category: "coffee" },
    { id: 39, name: "Quindim", category: "sweets" },
    { id: 40, name: "Milkshake de Chocolate", category: "beverages" }
  ];

  const router = useRouter();

  return (
    <main className="relative flex h-screen flex-col items-center justify-start px-10 pt-12">
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-full rounded-xl border-[#54361A] py-6 text-lg">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent className="text-lg">
          <SelectItem value="all">Todo o cardápio</SelectItem>
          <SelectItem value="sweets">Doces</SelectItem>
          <SelectItem value="coffee">Café</SelectItem>
          <SelectItem value="beverages">Bebidas</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex w-full flex-col gap-2 pb-44">
        {items
          .filter((item) => filter === "all" || item.category === filter)
          .map((item) => (
            <div
              className="flex w-full justify-between border-b border-[#8a4f18] py-4"
              key={item.id}
            >
              <div className="flex items-center gap-4">
                <Checkbox className="h-5 w-5" />
                <span className="text-base">{item.name}</span>
              </div>
              <ConfirmationModal title="Tem certeza que deseja retirar o item do cardápio?" />
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
