"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { FileArea } from "@/components/FIleArea/filearea";
import InputField from "@/components/InputField/inputField";
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
import { categories } from "@/lib/mockup/constants";
import { ProductForm, ProductFormSchema } from "@/validations/product";

export default function CreateProductPage() {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ProductForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ProductFormSchema)
  });

  const router = useRouter();
  const category = watch("category");

  return (
    <main className="relative flex h-full flex-col items-start justify-start gap-4 px-10 pt-12 pb-24">
      <ChevronLeft
        onClick={() => {
          router.back();
        }}
        className="h-6 w-6 text-[#AD4C24]"
        strokeWidth={4}
      />
      <h4 className="text-3xl font-semibold text-[#AD4C24]">Criar produto</h4>
      <form className="flex w-full flex-col gap-2">
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
          <FileArea handleFileChange={(file) => console.log(file)} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Categoria</p>
          <Select
            value={category}
            onValueChange={(e) => setValue("category", e)}
          >
            <SelectTrigger className="w-full rounded-[10px] border-[#AD4C24] py-6 text-lg">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="text-lg">
              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <InputField
          register={register}
          formErrors={errors}
          name="price"
          placeholder="Ex.: R$19,90"
          label="Preço do produto"
        />

        <div className="flex items-center gap-3 py-2">
          <Checkbox name="cashbonus" className="h-5 w-5" />
          <p>Tornar produto cashbônus</p>
        </div>
      </form>
      <Button variant={"brown"} className="w-full">
        Criar Produto
      </Button>
      <div className="flex w-full flex-col gap-2"></div>
    </main>
  );
}
