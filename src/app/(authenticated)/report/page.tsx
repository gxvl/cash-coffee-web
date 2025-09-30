import { MembershipModal } from "@/components/MembershipModal/membershipModal";
import ReportCard from "@/components/ReportCard/reportCard";

export default function ReportPage() {
  const products = [
    "Café",
    "Bolo de cenoura",
    "Pão de queijo",
    "Coxinha",
    "Pastel"
  ];
  return (
    <main className="relative flex h-full flex-col items-start justify-start gap-8 pt-12">
      <div className="flex items-center gap-2 place-self-center px-8">
        <div className="flex flex-col items-center gap-1">
          <h4 className="text-lg font-extrabold text-[#54361A]">51%</h4>
          <p className="text-sm font-semibold text-[#B35326]">homem</p>
        </div>
        <p className="text-lg font-bold text-[#D3D4D5]">•</p>
        <div className="flex flex-col items-center gap-1">
          <h4 className="text-lg font-extrabold text-[#54361A]">51%</h4>
          <p className="text-sm font-semibold text-[#B35326]">mulher</p>
        </div>
        <p className="text-lg font-bold text-[#D3D4D5]">•</p>
        <div className="flex w-full flex-col items-center gap-1">
          <h4 className="text-lg font-extrabold text-[#54361A]">51%</h4>
          <p className="w-full text-sm font-semibold text-[#B35326]">
            não binário
          </p>
        </div>
        <p className="text-lg font-bold text-[#D3D4D5]">•</p>
        <div className="flex flex-col items-center gap-1">
          <h4 className="text-lg font-extrabold text-[#54361A]">51%</h4>
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
        {products.map((product, index) => (
          <div
            className="flex w-[80%] items-center justify-center place-self-center border-b border-dashed py-2 text-center"
            key={index}
          >
            <p className="font-semibold text-[#54361A]"> {product}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 items-center justify-center gap-2 place-self-center px-2">
        <ReportCard
          title="Onde moram seus clientes"
          items={["Centro", "Zona Sul", "Zona Norte"]}
        />
        <ReportCard
          title="Público mais frequente"
          items={["18 a 24", "25 a 34", "35 a 44"]}
        />
        <ReportCard
          title="Melhor dia de vendas"
          items={["Segunda", "Terça", "Quarta"]}
        />
        <MembershipModal />
      </div>
    </main>
  );
}
