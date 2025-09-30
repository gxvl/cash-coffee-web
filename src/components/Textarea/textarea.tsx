import { FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import { TextAreaProps } from "./types";

const TextArea = <T extends FieldValues>({
  register,
  name,
  className,
  placeholder,
  ...props
}: TextAreaProps<T>) => {
  return (
    <textarea
      className={cn(
        "ring-offset-primary-50 focus-within:ring-primary-50 h-11 items-center gap-1 rounded-[10px] border border-[#AD4C24] px-3 pt-2 text-sm outline-none placeholder:text-[#BB5226] focus-within:ring-1 focus-within:ring-offset-2",
        className
      )}
      placeholder={placeholder}
      {...props}
      {...(register && name ? register(name) : {})}
    />
  );
};

export default TextArea;
