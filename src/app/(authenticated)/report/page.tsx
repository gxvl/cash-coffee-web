"use client";

import { useEffect, useState } from "react";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import LoadingComponent from "@/components/LoadingComponent/loading";
import { MembershipModal } from "@/components/MembershipModal/membershipModal";
import ReportCard from "@/components/ReportCard/reportCard";
import { useGetOrdersReport } from "@/hooks/queries/useGetOrdersReport";

export default function ReportPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const { data: report, isLoading } = useGetOrdersReport(userId || "");

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  if (isLoading || !report) {
    return (
      <main className="relative flex h-screen flex-col items-center justify-center px-6">
        <LoadingComponent />
      </main>
    );
  }

  // Get gender percentages
  const masculino =
    report.resumeGenders.find((g) => g.gender === "Masculino")?.perc || 0;
  const feminino =
    report.resumeGenders.find((g) => g.gender === "Feminino")?.perc || 0;
  const naoBinario =
    report.resumeGenders.find((g) => g.gender === "Não binário")?.perc || 0;
  const outro =
    report.resumeGenders.find((g) => g.gender === "Outro")?.perc || 0;

  // Get top 5 products
  const topProducts = report.resumeProducts.slice(0, 5);

  // Get top 3 cities
  const topCities = report.resumeCities
    .slice(0, 3)
    .map((city) => city.city.split("|")[1] || city.city);

  // Get top 3 age ranges
  const topAges = report.resumeAges.slice(0, 3).map((age) => age.range);

  // Get top 3 days of week (sorted by quantity)
  const topDays = [...report.resumeDaysWeek]
    .sort((a, b) => b.qtde - a.qtde)
    .slice(0, 3)
    .map((day) => day.dayWeek);

  return (
    <main className="relative flex h-full flex-col items-start justify-start gap-8 pt-12">
      <ChevronLeft
        onClick={() => {
          router.back();
        }}
        className="absolute top-4 left-4 h-8 w-8 cursor-pointer text-[#AD4C24]"
        strokeWidth={4}
      />
      <div className="flex items-center gap-2 place-self-center px-8">
        <div className="flex flex-col items-center gap-1">
          <h4 className="text-lg font-extrabold text-[#54361A]">
            {masculino.toFixed(0)}%
          </h4>
          <p className="text-sm font-semibold text-[#B35326]">homem</p>
        </div>
        <p className="text-lg font-bold text-[#D3D4D5]">•</p>
        <div className="flex flex-col items-center gap-1">
          <h4 className="text-lg font-extrabold text-[#54361A]">
            {feminino.toFixed(0)}%
          </h4>
          <p className="text-sm font-semibold text-[#B35326]">mulher</p>
        </div>
        <p className="text-lg font-bold text-[#D3D4D5]">•</p>
        <div className="flex w-full flex-col items-center gap-1">
          <h4 className="text-lg font-extrabold text-[#54361A]">
            {naoBinario.toFixed(0)}%
          </h4>
          <p className="w-full text-sm font-semibold text-[#B35326]">
            não binário
          </p>
        </div>
        <p className="text-lg font-bold text-[#D3D4D5]">•</p>
        <div className="flex flex-col items-center gap-1">
          <h4 className="text-lg font-extrabold text-[#54361A]">
            {outro.toFixed(0)}%
          </h4>
          <p className="text-sm font-semibold text-[#B35326]">outros</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center">
          <div className="h-[2px] w-full bg-[#B35326]" />
          <p className="w-full text-center text-sm font-semibold text-[#B35326]">
            Produtos mais vendidos
          </p>
          <div className="h-[2px] w-full bg-[#B35326]" />
        </div>
        {topProducts.length > 0 ? (
          topProducts.map((product, index) => (
            <div
              className="flex w-[80%] items-center justify-center place-self-center border-b border-dashed py-2 text-center"
              key={index}
            >
              <p className="font-semibold text-[#54361A]">{product.product}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-[#CBCCCE]">
            Nenhum produto vendido
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 items-center justify-center gap-2 place-self-center px-2">
        <ReportCard title="Onde moram seus clientes" items={topCities} />
        <ReportCard title="Público mais frequente" items={topAges} />
        <ReportCard title="Melhor dia de vendas" items={topDays} />
        <MembershipModal />
      </div>
    </main>
  );
}
