import { FieldValues } from "react-hook-form";

import { TextAreaFieldProps } from "./types";

import FormErrorLabel from "../FormErrorLabel/formErrorLabel";
import Label from "../Label/label";
import TextArea from "../Textarea/textarea";

const TextAreaField = <T extends FieldValues>({
  register,
  name,
  className,
  formErrors,
  label,
  placeholder
}: TextAreaFieldProps<T>) => {
  const errorMessage = formErrors && name ? formErrors[name]?.message : null;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label>
          {
            <span className="text-intense-purple text-sm font-normal">
              {label}
            </span>
          }
        </Label>
      )}
      <TextArea
        className={`h-32 ${className}`}
        name={name}
        register={register}
        placeholder={placeholder}
      />

      {errorMessage && (
        <FormErrorLabel>{errorMessage.toString()}</FormErrorLabel>
      )}
    </div>
  );
};

export default TextAreaField;
