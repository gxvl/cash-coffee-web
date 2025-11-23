import InputMask from "@mona-health/react-input-mask";
import { FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import { InputFieldProps } from "./types";

import FormErrorLabel from "../FormErrorLabel/formErrorLabel";
import Input from "../Input/input";
import Label from "../Label/label";

const InputField = <T extends FieldValues>({
  register,
  name,
  className,
  mask,
  formErrors,
  label,
  suffix,
  secondary = false,
  onSuffixClick,
  ...props
}: InputFieldProps<T>) => {
  const errorMessage = formErrors && name ? formErrors[name]?.message : null;

  const registrationProps = register ? register(name) : {};

  if (mask) {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        {label && (
          <Label>
            {
              <span
                className={`text-sm font-normal ${secondary && "text-white"}`}
              >
                {label}
              </span>
            }
          </Label>
        )}
        <InputMask
          {...props}
          {...registrationProps}
          className={cn(
            "ring-offset-primary-50 focus-within:ring-primary-50 h-11 w-full rounded-[10px] border border-[#AD4C24] px-3 text-base text-black outline-none",
            `${secondary ? "border-white text-black placeholder:text-gray-100" : "text-black placeholder:text-[#BB5226]"} bg-inherit ring-0 ring-offset-0 outline-none placeholder:text-sm ${props.readOnly && "text-search-gray"}`
          )}
          mask={mask}
        />
        {errorMessage && (
          <FormErrorLabel>{errorMessage.toString()}</FormErrorLabel>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label>
          {
            <span
              className={`text-sm font-normal ${secondary && "text-white"}`}
            >
              {label}
            </span>
          }
        </Label>
      )}
      <Input
        {...props}
        className={className}
        name={name}
        register={register}
        secondary={secondary}
        suffix={suffix}
        onSuffixClick={onSuffixClick}
      />
      {errorMessage && (
        <FormErrorLabel>{errorMessage.toString()}</FormErrorLabel>
      )}
    </div>
  );
};

export default InputField;
