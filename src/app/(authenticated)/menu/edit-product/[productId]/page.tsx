/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ConfirmationModal } from "@/components/confirmationModal/confirmationModal";
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
import { useGetProductById } from "@/hooks/queries/useGetProductById";
import { deleteProduct, updateProduct } from "@/services/productService";
import { ProductEditForm, ProductEditFormSchema } from "@/validations/product";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  const { data: product, isLoading: isLoadingProduct } =
    useGetProductById(productId);

  const { data: categoriesList, isLoading: loadingCategories } =
    useGetAllUserCategories(userId || "");

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ProductEditForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ProductEditFormSchema),
    defaultValues: {
      categoryId: product?.categoryId || "",
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price
        ? String(product.price.toFixed(2)).replace(".", ",")
        : "",
      isBonus: false
    }
  });

  // Preencher os campos quando o produto for carregado
  useEffect(() => {
    if (product) {
      setValue("categoryId", product.categoryId);
      setValue("name", product.name);
      setValue("description", product.description || "");
      setValue("price", String(product.price.toFixed(2)).replace(".", ","));
    }
  }, [product, setValue]);

  const categoryId = watch("categoryId");

  const { mutateAsync: updateProductMutate, isPending: isUpdating } =
    useMutation({
      mutationFn: async (data: ProductEditForm) => {
        const price = data.price
          ? parseFloat(data.price.replace(/[^\d,]/g, "").replace(",", "."))
          : undefined;

        return await updateProduct({
          productId,
          categoryId: data.categoryId || undefined,
          name: data.name || undefined,
          description: data.description || undefined,
          price,
          isBonus: data.isBonus || undefined,
          image: selectedFile || undefined
        });
      },
      onSuccess: () => {
        toast.success("Produto atualizado com sucesso!", {
          description: "As alterações foram salvas.",
          duration: 3000
        });
        queryClient.invalidateQueries({ queryKey: ["products", userId] });
        router.push("/menu");
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

  const { mutateAsync: deleteProductMutate, isPending: isDeleting } =
    useMutation({
      mutationFn: async () => {
        return await deleteProduct(productId);
      },
      onSuccess: () => {
        toast.success("Produto deletado com sucesso!", {
          description: "O produto foi removido do seu menu.",
          duration: 3000
        });
        router.push("/menu");
        queryClient.invalidateQueries({ queryKey: ["products", userId] });
      },
      onError: (error: unknown) => {
        console.error("Erro ao deletar produto:", error);
        const errorMessage =
          (error as any)?.response?.data?.message ||
          (error as any)?.message ||
          "Erro ao deletar produto. Tente novamente.";

        toast.error("Erro ao deletar produto", {
          description: errorMessage,
          duration: 5000
        });
      }
    });

  const onSubmit = async (data: ProductEditForm) => {
    if (!userId) {
      toast.error("Erro", { description: "Usuário não autenticado." });
      return;
    }
    await updateProductMutate(data);
  };

  const handleDelete = async () => {
    await deleteProductMutate();
    setIsDeleteModalOpen(false);
  };

  if (!product || isLoadingProduct) {
    return (
      <main className="flex h-screen items-center justify-center">
        <LoadingComponent />
      </main>
    );
  }

  return (
    <main className="relative flex h-full flex-col items-start justify-start gap-4 px-10 pt-12 pb-24">
      <ChevronLeft
        onClick={() => {
          router.back();
        }}
        className="h-6 w-6 cursor-pointer text-[#AD4C24]"
        strokeWidth={4}
      />
      <h4 className="text-3xl font-semibold text-[#AD4C24]">Editar produto</h4>
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
          <FileArea
            handleFileChange={(file) => setSelectedFile(file)}
            defaultFileName={product?.urlImage || undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Categoria</p>
          <Select
            defaultValue={"a"}
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
          disabled={!isValid || isUpdating}
        >
          {isUpdating ? <LoadingComponent /> : "Salvar Alterações"}
        </Button>
      </form>

      <Button
        variant="destructive"
        className="w-full"
        onClick={() => setIsDeleteModalOpen(true)}
        disabled={isDeleting}
      >
        {isDeleting ? <LoadingComponent /> : "Deletar Produto"}
      </Button>

      <ConfirmationModal
        title="Tem certeza que deseja deletar este produto?"
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </main>
  );
}
