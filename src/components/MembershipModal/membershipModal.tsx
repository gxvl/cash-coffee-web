import { LaptopMinimalCheck, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export function MembershipModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="flex h-[132px] flex-col items-center justify-center rounded-xl bg-[#B35326]">
            <Plus size={40} strokeWidth={4} className="text-white" />
          </div>
        </DialogTrigger>
        <DialogContent className="rounded-3xl sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <LaptopMinimalCheck size={52} color="#B35326" />
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-4 text-lg">
              <div className="flex flex-col">
                <p className="text-sm">
                  Você pode ter mais dados importantes do seu negócio por
                  apenas{" "}
                </p>
                <p className="font-bold">R$ 4,99/mês.</p>
              </div>
              <ul className="text-sm font-bold">
                <ul className="text-center text-sm font-bold">
                  <li>Ticket médio atualizado real time</li>
                  <li>Histórico de faturamento</li>
                  <li>Clientes mais frequentes</li>
                  <li>Quantidade de vendas por produto</li>
                  <li>+ outros dados</li>
                </ul>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="h-10 w-32 place-self-center" type="submit">
              Assinar
            </Button>
            <p className="text-center text-xs font-semibold text-[#54361A]">
              Valor referente ao plano anual de R$ 59,90 pago em parcela única
              na assinatura.
            </p>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
