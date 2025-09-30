"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Forgot4Page() {
  const router = useRouter();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-24 px-4 pt-24">
      <div className="flex w-full flex-col gap-2 px-4">
        <h4 className="text-center text-xl text-[#56381C]">Agora sim!</h4>
        <p className="text-center text-sm text-[#AD4C24]">
          Tudo certo com a sua senha.
        </p>
        <Button onClick={() => router.push("login")} className="mt-4">
          Entrar
        </Button>
      </div>
      <Image
        className="mt-32"
        priority
        src={"/marca.png"}
        width={160}
        height={160}
        alt="marca"
      />
    </main>
  );
}
