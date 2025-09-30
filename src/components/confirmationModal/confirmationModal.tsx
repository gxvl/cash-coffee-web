import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export function ConfirmationModal({ title }: { title: string }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="h-7 w-max">Editar</Button>
        </DialogTrigger>
        <DialogContent className="rounded-3xl border-none bg-[#B35326] text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <p className="px-10 text-base">{title}</p>
            </DialogTitle>
          </DialogHeader>
          <div className="flex w-full items-center justify-center gap-4">
            <Button variant={"brown"} className="h-10 w-32" type="submit">
              Sim
            </Button>
            <Button variant={"brown"} className="h-10 w-32" type="submit">
              Não
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
