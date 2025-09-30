"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuestionsPage() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full flex-col gap-6 px-10 pt-12">
      <div className="flex w-full justify-between">
        <div />
        <div
          onClick={() => router.back()}
          className="flex w-max items-center justify-center place-self-end rounded-full bg-[#55351A] p-2"
        >
          <X className="h-3 w-3 text-white" />
        </div>
      </div>
      <h2 className="text-center text-xl text-[#AD4C24]">Pergunta 1</h2>
      <p className="text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        urna vel lorem interdum maximus. Quisque porttitor.{" "}
      </p>
      <h2 className="text-center text-xl text-[#AD4C24]">Pergunta 1</h2>
      <p className="text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        urna vel lorem interdum maximus. Quisque porttitor.{" "}
      </p>
      <h2 className="text-center text-xl text-[#AD4C24]">Pergunta 1</h2>
      <p className="text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        urna vel lorem interdum maximus. Quisque porttitor.{" "}
      </p>
      <h2 className="text-center text-xl text-[#AD4C24]">Pergunta 1</h2>
      <p className="text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        urna vel lorem interdum maximus. Quisque porttitor.{" "}
      </p>
      <h2 className="text-center text-xl text-[#AD4C24]">Pergunta 1</h2>
      <p className="text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        urna vel lorem interdum maximus. Quisque porttitor.{" "}
      </p>
    </div>
  );
}
