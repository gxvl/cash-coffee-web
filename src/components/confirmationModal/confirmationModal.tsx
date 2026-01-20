import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface ConfirmationModalProps {
  title: string;
  trigger?: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ConfirmationModal({
  title,
  trigger,
  onConfirm,
  onCancel,
  open,
  onOpenChange
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="rounded-3xl border-none bg-[#B35326] text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <p className="px-10 text-base">{title}</p>
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full items-center justify-center gap-4">
          <Button
            variant={"brown"}
            className="h-10 w-32"
            onClick={handleConfirm}
          >
            Sim
          </Button>
          <Button
            variant={"brown"}
            className="h-10 w-32"
            onClick={handleCancel}
          >
            Não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
