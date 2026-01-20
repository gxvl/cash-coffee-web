/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmationModal } from "@/components/confirmationModal/confirmationModal";
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
import { updateProduct } from "@/services/productService";

export default function CashbonusPage() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [bonusFilter, setBonusFilter] = useState("all");
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<{
    productId: string;
    categoryId: string;
    currentValue: boolean;
  } | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  const { data: productList, isLoading: loadingProducts } =
    useGetAllUserProducts(userId || "", true);

  const { data: categoriesList, isLoading: loadingCategories } =
    useGetAllUserCategories(userId || "");

  const { mutateAsync: updateProductMutate, isPending: isUpdating } =
    useMutation({
      mutationFn: async (data: {
        productId: string;
        categoryId: string;
        isBonus: boolean;
      }) => {
        return await updateProduct({
          productId: data.productId,
          categoryId: data.categoryId,
          isBonus: data.isBonus
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products", userId, true] });
        toast.success("Produto atualizado com sucesso!", {
          description: "O status de cashbônus foi alterado.",
          duration: 3000
        });
      },
      onError: (error: unknown) => {
        console.error("Erro ao atualizar produto:", error);
        const errorMessage =
          (error as any)?.response?.data?.message ||
          (error as any)?.message ||
          "Erro ao atualizar produto. Tente novamente.";

        toast.error("Erro ao atualizar produto", {
          description: errorMessage,
          duration: 5000
        });
      }
    });

  const handleCheckboxClick = (
    productId: string,
    categoryId: string,
    currentValue: boolean
  ) => {
    setPendingToggle({ productId, categoryId, currentValue });
    setIsModalOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (!pendingToggle) return;

    await updateProductMutate({
      productId: pendingToggle.productId,
      categoryId: pendingToggle.categoryId,
      isBonus: !pendingToggle.currentValue
    });

    setIsModalOpen(false);
    setPendingToggle(null);
  };

  const handleCancelToggle = () => {
    setIsModalOpen(false);
    setPendingToggle(null);
  };

  const filteredProducts = productList
    ? productList.filter((item) => {
        const matchesCategory =
          categoryFilter === "all" || item.categoryId === categoryFilter;
        const matchesBonus =
          bonusFilter === "all" ||
          (bonusFilter === "bonus" && item.isBonus === true) ||
          (bonusFilter === "no-bonus" && item.isBonus === false);

        return matchesCategory && matchesBonus;
      })
    : [];

  return (
    <main className="relative flex h-screen flex-col items-center justify-start gap-3 px-10 pt-12">
      <ChevronLeft
        onClick={() => {
          router.back();
        }}
        className="absolute top-4 left-4 h-8 w-8 cursor-pointer text-[#AD4C24]"
        strokeWidth={4}
      />
      {loadingCategories ? (
        <div className="flex w-full items-center justify-center">
          <LoadingComponent />
        </div>
      ) : (
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="mt-6 w-full rounded-xl border-[#54361A] py-6 text-lg">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent className="text-lg">
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categoriesList &&
              categoriesList.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}

      <Select value={bonusFilter} onValueChange={setBonusFilter}>
        <SelectTrigger className="w-full rounded-xl border-[#54361A] py-6 text-lg">
          <SelectValue placeholder="Filtrar por cashbônus" />
        </SelectTrigger>
        <SelectContent className="text-lg">
          <SelectItem value="all">Todos os produtos</SelectItem>
          <SelectItem value="bonus">Apenas produtos cashbônus</SelectItem>
          <SelectItem value="no-bonus">
            Apenas produtos fora do cashbônus
          </SelectItem>
        </SelectContent>
      </Select>

      {loadingProducts ? (
        <div className="mt-5 flex w-full items-center justify-center">
          <LoadingComponent />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-2">
          <p className="text-center text-lg text-gray-500">
            Nenhum produto encontrado
          </p>
          <p className="text-center text-sm text-gray-400">
            Ajuste os filtros ou cadastre novos produtos
          </p>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2 pb-44">
          {filteredProducts.map((item) => (
            <div
              className="flex w-full justify-between border-b border-[#8a4f18] py-4"
              key={item.id}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={item.isBonus}
                  onCheckedChange={() =>
                    handleCheckboxClick(
                      item.id,
                      item.categoryId,
                      item.isBonus || false
                    )
                  }
                  disabled={isUpdating}
                  className="h-5 w-5"
                />
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

      <div className="fixed bottom-0 flex h-[20vh] w-full justify-center gap-2 py-4 backdrop-blur-md">
        <Button onClick={() => router.push("/menu/create-product")}>
          Cadastrar produto
        </Button>
        <Button onClick={() => router.push("/menu/create-category")}>
          Criar categoria
        </Button>
      </div>

      <ConfirmationModal
        title={
          pendingToggle?.currentValue
            ? "Tem certeza que deseja remover este produto do cashbônus?"
            : "Tem certeza que deseja adicionar este produto ao cashbônus?"
        }
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleConfirmToggle}
        onCancel={handleCancelToggle}
      />
    </main>
  );
}
