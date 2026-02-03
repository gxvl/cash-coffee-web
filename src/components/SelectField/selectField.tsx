/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

import Label from "@/components/Label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import FormErrorLabel from "../FormErrorLabel/formErrorLabel";

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  required?: boolean;
  formErrors: FieldErrors;
  register?: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  defaultValue?: string;
}

export default function SelectField({
  name,
  label,
  placeholder = "Selecione uma opção",
  options,
  required = false,
  formErrors,
  setValue,
  defaultValue
}: SelectFieldProps) {
  const error = formErrors[name];

  const errorMessage = error?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label name={name}>
          <span className="text-sm font-normal">
            {label}
            {required && <span className="text-red-600"> *</span>}
          </span>
        </Label>
      )}
      <Select
        name={name}
        defaultValue={defaultValue}
        onValueChange={(value) =>
          setValue(name, value, { shouldValidate: true })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errorMessage && <FormErrorLabel>{errorMessage}</FormErrorLabel>}
    </div>
  );
}
