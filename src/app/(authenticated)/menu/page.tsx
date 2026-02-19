"use client";

import { useEffect, useState } from "react";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import LoadingComponent from "@/components/LoadingComponent/loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useGetAllUserCategories } from "@/hooks/queries/useGetAllUserCategories";
import { useGetAllUserProducts } from "@/hooks/queries/useGetAllUserProducts";

export default function MenuPage() {
  const [filter, setFilter] = useState("all");

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  const { data: productList, isLoading: loadingProducts } =
    useGetAllUserProducts(userId || "", true);

  const { data: categoriesList, isLoading: loadingCategories } =
    useGetAllUserCategories(userId || "");
  console.log(categoriesList);
  const router = useRouter();

  return (
    <main className="relative flex h-screen flex-col items-center justify-start px-10 pt-12">
      <ChevronLeft
        onClick={() => {
          router.back();
        }}
        className="absolute top-4 left-4 h-8 w-8 cursor-pointer text-[#AD4C24]"
        strokeWidth={4}
      />
      {loadingCategories ? (
        <div className="mt-5 flex w-full items-center justify-center">
          <LoadingComponent />
        </div>
      ) : (
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="mt-5 w-full rounded-xl border-[#54361A] py-6 text-lg">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent className="text-lg">
            <SelectItem value="all">Todo o cardápio</SelectItem>
            {categoriesList &&
              categoriesList.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
      {loadingProducts ? (
        <div className="mt-5 flex w-full items-center justify-center">
          <LoadingComponent />
        </div>
      ) : productList && productList.length === 0 ? (
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-2">
          <p className="text-center text-lg text-gray-500">
            Sem produtos cadastrados
          </p>
          <p className="text-center text-sm text-gray-400">
            Clique em &quot;Cadastrar produto&quot; para adicionar o primeiro
            produto ao seu menu
          </p>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2 pb-44">
          {productList &&
            productList
              .filter((item) => filter === "all" || item.categoryId === filter)
              .map((item) => (
                <div
                  className="flex w-full justify-between border-b border-[#8a4f18] py-4"
                  key={item.id}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox className="h-5 w-5" />
                    <span className="text-base">{item.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/menu/edit-product/${item.id}`)}
                  >
                    Editar
                  </Button>
                </div>
              ))}
        </div>
      )}
      <div className="fixed bottom-20 z-[60] flex h-[12vh] w-full flex-col items-center justify-center gap-2 py-4 backdrop-blur-md md:bottom-0">
        {!categoriesList && (
          <p className="text-center text-sm font-medium text-[#AD4C24]">
            Você precisa criar pelo menos uma categoria antes de cadastrar um
            produto
          </p>
        )}
        <div className="flex gap-2">
          <Button
            disabled={categoriesList ? categoriesList.length === 0 : true}
            onClick={() => router.push("/menu/create-product")}
          >
            Cadastrar produto
          </Button>
          <Button onClick={() => router.push("/menu/create-category")}>
            Criar categoria
          </Button>
        </div>
      </div>
    </main>
  );
}
