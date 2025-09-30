import { FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import { InputProps } from "./types";

const Input = <T extends FieldValues>({
  register,
  name,
  className,
  secondary = false,
  suffix,
  onSuffixClick,
  inputPrefix,
  ...props
}: InputProps<T>) => {
  return (
    <div
      className={cn(
        "ring-offset-primary-50 focus-within:ring-primary-50 relative flex h-11 w-full items-center gap-1 rounded-[10px] border border-[#AD4C24] px-3 text-base text-black outline-none",
        className
      )}
    >
      <div className="absolute top-1/2 left-5 z-10 -translate-y-1/2">
        {inputPrefix}
      </div>
      <input
        className={`${inputPrefix && "ml-10"} ${secondary ? "border-white text-black placeholder:text-gray-100" : "text-black placeholder:text-[#BB5226]"} w-full bg-inherit ring-0 ring-offset-0 outline-none placeholder:text-sm ${props.readOnly && "text-search-gray"} `}
        {...props}
        {...(register && name ? register(name) : {})}
      />
      <div
        onClick={onSuffixClick}
        className="absolute top-1/2 right-5 z-10 -translate-y-1/2"
      >
        {suffix}
      </div>
    </div>
  );
};

export default Input;
