"use client";

import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-between gap-64 px-14 pt-20 md:flex-row md:justify-center md:pt-0">
      <Image
        alt="Cafeteria background"
        src="/imagem.login.jpg"
        fill
        className="-z-10 object-cover"
      />
      <div className="relative h-10 w-40 overflow-hidden md:h-24 md:w-[22rem]">
        <Image
          src={"/marcabrancacc.png"}
          alt="Logo"
          fill
          className="object-fill"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-14 pb-20 md:pt-20 md:pb-0">
        <h4 className="flex w-full flex-col text-[34px] leading-tight font-extrabold text-white md:text-end">
          Venda para milhões de apaixonados <br /> por cafeterias
        </h4>
        <div className="flex w-full flex-col justify-center gap-4">
          <Button onClick={() => router.push("/register")}>
            Cadastrar minha cafeteria
          </Button>
          <Button variant="secondary" onClick={() => router.push("/login")}>
            Entrar
          </Button>
        </div>
        <CircleQuestionMark
          onClick={() => router.push("/questions")}
          className="h-10 w-10 place-self-center text-white"
        />
      </div>
    </main>
  );
}
