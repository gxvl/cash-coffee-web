"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Forgot2Page() {
  const router = useRouter();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-24 px-4 pt-24">
      <div className="flex w-full flex-col gap-2 px-4">
        <h4 className="text-center text-xl text-[#56381C]">Criar nova senha</h4>
        <Button onClick={() => router.push("forgot3")} className="mt-2">
          Pelo email ost****@vilecafe.com
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
