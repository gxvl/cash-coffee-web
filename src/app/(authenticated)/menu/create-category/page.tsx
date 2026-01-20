/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Importando TanStack Query
import { Check, ChevronLeft, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ConfirmationModal } from "@/components/confirmationModal/confirmationModal";
import Input from "@/components/Input/input";
import InputField from "@/components/InputField/inputField";
import LoadingComponent from "@/components/LoadingComponent/loading";
import { Button } from "@/components/ui/button";
import { useGetAllUserCategories } from "@/hooks/queries/useGetAllUserCategories";
import {
  createCategory,
  deleteCategory,
  updateCategory
} from "@/services/categoryService";
import { CategoryForm, CategoryFormSchema } from "@/validations/category";

export default function CreateCategoryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [editedName, setEditedName] = useState<string>("");
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  const { data: categoriesList, isLoading: loadingCategories } =
    useGetAllUserCategories(userId || "");

  const { mutateAsync: createCategoryMutate, isPending: isCreating } =
    useMutation({
      mutationFn: async (data: CategoryForm) => {
        return await createCategory({
          userId: userId!,
          name: data.name,
          description: data.description || "",
          isActive: true
        });
      },
      onSuccess: () => {
        toast.success("Categoria criada com sucesso!", {
          description: "A categoria foi adicionada ao seu menu.",
          duration: 3000
        });
        reset();

        queryClient.invalidateQueries({ queryKey: ["categories", userId] });
      },
      onError: (error: unknown) => {
        console.error("Erro ao criar categoria:", error);
        const errorMessage =
          (error as any)?.response?.data?.message ||
          (error as any)?.message ||
          "Erro ao criar categoria. Tente novamente.";

        toast.error("Erro ao criar categoria", {
          description: errorMessage,
          duration: 5000
        });
      }
    });

  const { mutateAsync: updateCategoryMutate, isPending: isUpdating } =
    useMutation({
      mutationFn: async ({
        categoryId,
        name,
        isActive
      }: {
        categoryId: string;
        name: string;
        isActive: boolean;
      }) => {
        return await updateCategory(categoryId, userId!, name, isActive);
      },
      onSuccess: () => {
        toast.success("Categoria atualizada com sucesso!", {
          duration: 3000
        });
        setSelectedCategoryId(null);
        setEditedName("");
        queryClient.invalidateQueries({ queryKey: ["categories", userId] });
      },
      onError: (error: unknown) => {
        console.error("Erro ao atualizar categoria:", error);
        const errorMessage =
          (error as any)?.response?.data?.message ||
          (error as any)?.message ||
          "Erro ao atualizar categoria. Tente novamente.";

        toast.error("Erro ao atualizar categoria", {
          description: errorMessage,
          duration: 5000
        });
      }
    });

  const { mutateAsync: deleteCategoryMutate, isPending: isDeleting } =
    useMutation({
      mutationFn: async (categoryId: string) => {
        return await deleteCategory(categoryId);
      },
      onSuccess: () => {
        toast.success("Categoria deletada com sucesso!", {
          duration: 3000
        });
        setSelectedCategoryId(null);
        setEditedName("");
        queryClient.invalidateQueries({ queryKey: ["categories", userId] });
      },
      onError: (error: unknown) => {
        console.error("Erro ao deletar categoria:", error);
        const errorMessage =
          (error as any)?.response?.data?.message ||
          (error as any)?.message ||
          "Erro ao deletar categoria. Tente novamente.";

        toast.error("Erro ao deletar categoria", {
          description: errorMessage,
          duration: 5000
        });
      }
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<CategoryForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(CategoryFormSchema)
  });

  const onSubmit = async (data: CategoryForm) => {
    if (!userId) {
      toast.error("Erro", { description: "Usuário não autenticado." });
      return;
    }
    await createCategoryMutate(data);
  };

  return (
    <main className="relative flex h-full flex-col items-start justify-start gap-6 px-10 pt-12">
      <ChevronLeft
        onClick={() => router.back()}
        className="h-6 w-6 cursor-pointer text-[#AD4C24]"
        strokeWidth={4}
      />
      <h4 className="text-3xl font-semibold text-[#AD4C24]">Criar categoria</h4>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <InputField
          name="name"
          register={register}
          formErrors={errors}
          placeholder="Nome da categoria"
        />
        <Button
          variant={"brown"}
          className="mt-4 w-full"
          type="submit"
          disabled={!isValid || isCreating}
        >
          {isCreating ? <LoadingComponent /> : "Criar categoria"}
        </Button>
      </form>

      <div className="flex w-full flex-col gap-2">
        <p className="w-full text-center text-sm font-bold text-[#573418]">
          Todas as categorias
        </p>
        <div className="flex w-full flex-col gap-2 pb-32">
          {loadingCategories ? (
            <div className="flex w-full justify-center py-8">
              <LoadingComponent />
            </div>
          ) : categoriesList && categoriesList.length > 0 ? (
            categoriesList.map((item) => (
              <div
                className="flex w-full justify-between border-b border-[#8a4f18] py-4"
                key={item.id}
              >
                <div className="flex items-center gap-4">
                  {selectedCategoryId === item.id ? (
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder={item.name}
                    />
                  ) : (
                    <span className="text-base">{item.name}</span>
                  )}
                </div>
                {item.id === selectedCategoryId ? (
                  <div className="flex justify-center gap-2">
                    <div
                      onClick={async () => {
                        if (!editedName.trim()) {
                          toast.error("Nome não pode estar vazio");
                          return;
                        }
                        await updateCategoryMutate({
                          categoryId: item.id,
                          name: editedName,
                          isActive: item.isActive
                        });
                      }}
                      className="flex transform cursor-pointer items-center justify-center rounded-full border-2 border-green-400 p-2 duration-100 hover:scale-110 hover:bg-green-100"
                    >
                      {isUpdating ? (
                        <LoadingComponent className="h-5 w-5 text-green-400" />
                      ) : (
                        <Check
                          strokeWidth={3}
                          className="h-5 w-5 text-green-400"
                        />
                      )}
                    </div>
                    <div
                      onClick={() => {
                        setSelectedCategoryId(null);
                        setEditedName("");
                      }}
                      className="flex transform cursor-pointer items-center justify-center rounded-full border-2 border-gray-400 p-2 duration-100 hover:scale-110 hover:bg-gray-100"
                    >
                      <X strokeWidth={3} className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex h-full w-[2px] rounded-xl bg-gray-300" />
                    <div
                      onClick={() => {
                        setCategoryToDelete({ id: item.id, name: item.name });
                      }}
                      className="flex transform cursor-pointer items-center justify-center rounded-full border-2 border-red-400 p-2 duration-100 hover:scale-110 hover:bg-red-100"
                    >
                      {isDeleting ? (
                        <LoadingComponent className="h-5 w-5 text-red-400" />
                      ) : (
                        <Trash2
                          strokeWidth={3}
                          className="h-5 w-5 text-red-400"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <Button
                    className="rounded-xl border-none px-7"
                    variant={"brown"}
                    size={"sm"}
                    onClick={() => {
                      setSelectedCategoryId(item.id);
                      setEditedName(item.name);
                    }}
                  >
                    Editar
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p className="w-full py-8 text-center text-sm text-gray-500">
              Nenhuma categoria cadastrada ainda.
            </p>
          )}
        </div>
      </div>

      <ConfirmationModal
        title={`Tem certeza que deseja deletar a categoria "${categoryToDelete?.name}"?`}
        open={!!categoryToDelete}
        onOpenChange={(open) => {
          if (!open) setCategoryToDelete(null);
        }}
        onConfirm={async () => {
          if (categoryToDelete) {
            await deleteCategoryMutate(categoryToDelete.id);
            setCategoryToDelete(null);
          }
        }}
        onCancel={() => setCategoryToDelete(null)}
      />
    </main>
  );
}
