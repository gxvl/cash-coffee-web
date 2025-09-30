"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

// A interface não precisa de nenhuma propriedade customizada para esta funcionalidade
interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  isOpen?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className,
  isOpen,
   ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    className={cn(
      // 1. Aumentamos a largura para acomodar o texto e adicionamos `relative`
      "relative inline-flex h-7 w-44 shrink-0 items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[#B35125] data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
  >

    <span
      aria-hidden="true"
      className={`pointer-events-none absolute self-center left-15 text-xs font-medium ${isOpen ? "text-white" : "text-muted-foreground"}`}
    >
      {isOpen ? "Aberta" : "Fechada"}
    </span>
    
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block h-6 w-9 rounded-full bg-background shadow-lg duration-500 ring-0 transition-transform data-[state=checked]:translate-x-32 data-[state=unchecked]:translate-x-1"
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";

export { Switch };