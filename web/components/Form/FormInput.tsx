import React from "react";
import { FieldError } from "../../types";
import { FormError } from "./FormError";

interface FormInputProps {
  value: string;
  setValue: (value: string) => void;
  error: FieldError;
  field: string;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  value,
  setValue,
  error,
  field,
  type,
}) => {
  return (
    <>
      <input
        type={type ?? "text"}
        className="border border-slate-200 rounded-md text-xs p-1 w-full mb-2 shadow-sm"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        style={error?.field == field ? { borderColor: "red" } : {}}
      />
      <FormError error={error} field={field} />
    </>
  );
};
