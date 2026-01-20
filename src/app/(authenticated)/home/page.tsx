"use client";

import { useEffect, useRef, useState } from "react";

import {
  Coffee,
  Plus,
  Settings,
  ClipboardList,
  BookOpenText,
  Star,
  Clock,
  BarChart3,
  Settings2,
  LogOut
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Menu } from "@/components/DropdownMenu/dropdownMenu";
import { DropdownMenuGroup } from "@/components/DropdownMenu/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/authContext";
import { useGetOrderSummary } from "@/hooks/queries/useGetOrderSummary";
import { useGetUser } from "@/hooks/queries/useGetUser";
import { useGetUserPhotoUrl } from "@/hooks/queries/useGetUserPhoto";
import { useUpdateShopStatus } from "@/hooks/queries/useUpdateShopStatus";
import { useUploadUserPhoto } from "@/hooks/queries/useUploadUserPhoto";

export default function HomePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { logout } = useAuth();
  const { mutate: uploadPhoto, isPending: uploadingPhoto } =
    useUploadUserPhoto();
  const { mutate: updateShopStatus, isPending: updatingShopStatus } =
    useUpdateShopStatus();
  const { data: summary, isLoading: loadingSummary } = useGetOrderSummary(
    userId || ""
  );

  const { data: photoUrl, isLoading: loadingPhotoUrl } = useGetUserPhotoUrl(
    userId || ""
  );

  const { data: userData, isLoading: loadingUserData } = useGetUser(
    userId || ""
  );

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione uma imagem válida");
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    uploadPhoto(
      { userId, imageFile: file },
      {
        onSuccess: () => {
          toast.success("Foto de perfil atualizada com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao atualizar foto de perfil");
        }
      }
    );
  };

  const handleShopStatusChange = (newStatus: boolean) => {
    if (!userId) return;

    updateShopStatus(
      { shopId: userId, isOpenShop: newStatus },
      {
        onSuccess: () => {
          toast.success(
            newStatus ? "Loja aberta com sucesso!" : "Loja fechada com sucesso!"
          );
        },
        onError: () => {
          toast.error("Erro ao alterar status da loja");
        }
      }
    );
  };

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

  const menuGroups: DropdownMenuGroup[] = [
    {
      items: [
        {
          label: "Configurações",
          icon: <Settings2 className="h-4 w-4" />,
          onClick: () => router.push("/settings/user")
        }
      ],
      separator: true // Adiciona separador após este grupo
    },
    {
      items: [
        {
          label: "Sair",
          icon: <LogOut className="h-4 w-4" />,
          onClick: logout
        }
      ]
    }
  ];

  return (
    <main className="flex h-screen flex-col gap-6 pt-10">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
      <div className="flex items-center justify-center gap-10">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-[#B35125] transition-opacity hover:opacity-80"
        >
          {uploadingPhoto || loadingPhotoUrl ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : photoUrl ? (
            <div className="relative h-[90%] w-[90%] rounded-full">
              <Image
                src={photoUrl}
                fill
                alt="User Photo"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
          ) : (
            <Coffee className="text-white" />
          )}
          <div className="absolute right-0 bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#54361A]">
            <Plus className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-[#54361A]">Show Café</p>
            <Menu
              groups={menuGroups}
              trigger={
                <Settings
                  onClick={() => router.push("/settings/user")}
                  className="transform cursor-pointer text-[#B35125] duration-100 hover:scale-110"
                />
              }
            />
          </div>
          {loadingUserData || updatingShopStatus ? (
            <div className="flex h-8 w-full items-center justify-center rounded-full bg-gray-100">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            </div>
          ) : (
            <Switch
              checked={userData?.IsOpenShop}
              isOpen={userData?.IsOpenShop}
              onCheckedChange={handleShopStatusChange}
              disabled={updatingShopStatus}
            />
          )}
          {/* <div className="flex items-center justify-between">
            <p className="border-b-2 border-[#B35125] text-xs font-bold">
              Complete o cadastro
            </p>
            <Mail className="text-[#B35125]" />
          </div> */}
        </div>
      </div>
      <div className="flex h-28 w-full flex-col items-center justify-center bg-[#B35125]">
        <p className="text-sm font-bold text-white">Vendas pelo CashCoffee</p>
        <div className="flex items-end gap-2 font-light text-white">
          <p className="font-bold">R$</p>
          <h3 className="text-5xl">
            {loadingSummary ? (
              <div className="mx-4 h-7 w-7 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : summary?.OrdersTotal?.toString().includes(".") ? (
              summary.OrdersTotal
            ) : (
              `${summary?.OrdersTotal},00`
            )}
          </h3>
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
