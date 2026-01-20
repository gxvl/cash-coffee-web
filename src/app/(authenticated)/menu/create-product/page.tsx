/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FileArea } from "@/components/FIleArea/filearea";
import InputField from "@/components/InputField/inputField";
import LoadingComponent from "@/components/LoadingComponent/loading";
import TextAreaField from "@/components/TextareaField/textareaField";
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
import { createProduct } from "@/services/productService";
import { ProductForm, ProductFormSchema } from "@/validations/product";

export default function CreateProductPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  const { data: categoriesList, isLoading: loadingCategories } =
    useGetAllUserCategories(userId || "");

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ProductForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ProductFormSchema)
  });

  const categoryId = watch("categoryId");

  const { mutateAsync: createProductMutate, isPending: isCreating } =
    useMutation({
      mutationFn: async (data: ProductForm) => {
        const price = parseFloat(
          data.price.replace(/[^\d,]/g, "").replace(",", ".")
        );

        return await createProduct({
          categoryId: data.categoryId,
          name: data.name,
          description: data.description,
          price,
          image: selectedFile || undefined,
          isBonus: data.isBonus || false
        });
      },
      onSuccess: () => {
        toast.success("Produto criado com sucesso!", {
          description: "O produto foi adicionado ao seu menu.",
          duration: 3000
        });
        reset();
        setSelectedFile(null);
        queryClient.invalidateQueries({ queryKey: ["products", userId] });

        router.push("/menu");
      },
      onError: (error: unknown) => {
        console.error("Erro ao criar produto:", error);
        const errorMessage =
          (error as any)?.response?.data?.message ||
          (error as any)?.message ||
          "Erro ao criar produto. Tente novamente.";

        toast.error("Erro ao criar produto", {
          description: errorMessage,
          duration: 5000
        });
      }
    });

  const onSubmit = async (data: ProductForm) => {
    if (!userId) {
      toast.error("Erro", { description: "Usuário não autenticado." });
      return;
    }
    await createProductMutate(data);
  };

  return (
    <main className="relative flex h-full flex-col items-start justify-start gap-4 px-10 pt-12 pb-24">
      <ChevronLeft
        onClick={() => {
          router.back();
        }}
        className="h-6 w-6 cursor-pointer text-[#AD4C24]"
        strokeWidth={4}
      />
      <h4 className="text-3xl font-semibold text-[#AD4C24]">Criar produto</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2"
      >
        <InputField
          name="name"
          register={register}
          formErrors={errors}
          placeholder="Nome"
          label="Nome do produto"
        />
        <TextAreaField
          name="description"
          register={register}
          formErrors={errors}
          placeholder="Descrição"
          label="Descrição do produto"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm">Fotos</p>
          <FileArea handleFileChange={(file) => setSelectedFile(file)} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Categoria</p>
          <Select
            value={categoryId}
            onValueChange={(e) =>
              setValue("categoryId", e, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full rounded-[10px] border-[#AD4C24] py-6 text-lg">
              <SelectValue
                placeholder={
                  loadingCategories
                    ? "Carregando..."
                    : "Selecione uma categoria"
                }
              />
            </SelectTrigger>
            <SelectContent className="text-lg">
              {loadingCategories ? (
                <SelectItem value="loading" disabled>
                  Carregando...
                </SelectItem>
              ) : categoriesList && categoriesList.length > 0 ? (
                categoriesList.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="empty" disabled>
                  Nenhuma categoria cadastrada
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <p className="text-xs text-red-500">{errors.categoryId.message}</p>
          )}
        </div>
        <InputField
          register={register}
          formErrors={errors}
          name="price"
          placeholder="Ex.: 19,90"
          label="Preço do produto"
        />

        <div className="flex items-center gap-3 py-2">
          <Checkbox
            onCheckedChange={(checked) => setValue("isBonus", !!checked)}
            className="h-5 w-5"
          />
          <p>Tornar produto cashbônus</p>
        </div>
        <Button
          variant={"brown"}
          className="w-full"
          type="submit"
          disabled={!isValid || isCreating}
        >
          {isCreating ? <LoadingComponent /> : "Criar Produto"}
        </Button>
      </form>
      <div className="flex w-full flex-col gap-2"></div>
    </main>
  );
}
