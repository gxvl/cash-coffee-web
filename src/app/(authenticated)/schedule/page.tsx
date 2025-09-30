import { Eye, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { days } from "@/lib/mockup/constants";

export default function SchedulePage() {
  return (
    <main className="relative flex h-screen flex-col items-center gap-2 px-6 pt-32">
      {days.map((day) => (
        <div key={day.day} className="flex w-full items-center justify-between">
          <p
            className={`text-sm font-bold ${day.entry1 || day.output1 || day.entry2 || day.output2 ? "text-[#55381C]" : "text-[#CBCCCE]"}`}
          >
            {day.day}
          </p>
          <div className="flex items-center gap-2">
            <div
              className={`flex h-10 w-12 items-center justify-center rounded-2xl ${day.entry1 ? "border border-[#B35326]" : "bg-[#CBCCCE]"} p-3`}
            >
              {day.entry1 && (
                <p className="text-xs text-[#55381C]">{day.entry1}</p>
              )}
            </div>
            <div
              className={`flex h-10 w-12 items-center justify-center rounded-2xl ${day.output1 ? "border border-[#B35326]" : "bg-[#CBCCCE]"} p-3`}
            >
              {day.output1 && (
                <p className="text-xs text-[#55381C]">{day.output1}</p>
              )}
            </div>
            <p className="font-bold text-[#CBCCCE]">•</p>
            <div
              className={`flex h-10 w-12 items-center justify-center rounded-2xl ${day.entry2 ? "border border-[#B35326]" : "bg-[#CBCCCE]"} p-3`}
            >
              {day.entry2 && (
                <p className="text-xs text-[#55381C]">{day.entry2}</p>
              )}
            </div>
            <div
              className={`flex h-10 w-12 items-center justify-center rounded-2xl ${day.output2 ? "border border-[#B35326]" : "bg-[#CBCCCE]"} p-3`}
            >
              {day.output2 && (
                <p className="text-xs text-[#55381C]">{day.output2}</p>
              )}
            </div>
            {day.entry1 || day.output1 || day.entry2 || day.output2 ? (
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#54361A]">
                <X className="text-white" size={10} />
              </div>
            ) : (
              <Eye size={20} color="#B35326" />
            )}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <Checkbox className="h-5 w-5 border-[#B35326]" />
        <p className="py-5 text-[#B35326]">Não fechamos para almoço</p>
      </div>
      <Button>Salvar horário de funcionamento</Button>
      <div className="ml-8 flex w-full items-center justify-center gap-4 pt-6">
        <Checkbox className="h-5 w-5 border-[#54361A]" />
        <p className="py-5 text-sm text-[#54361A]">
          Deixar botão indicativo de aberta e fechada automático de acordo com o
          horário de funcionamento salvo
        </p>
      </div>
    </main>
  );
}
