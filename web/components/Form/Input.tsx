import React from "react";
import { FieldError } from "../../types";
import { FormError } from "./Error";

interface FormInputProps {
  value: string;
  handleChange: (payload: string, field: string) => void;
  error: FieldError;
  field: string;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  value,
  handleChange,
  error,
  field,
  type,
}) => {
  console.log(typeof handleChange);
  return (
    <>
      <input
        type={type ?? "text"}
        className="border border-slate-200 rounded-md text-xs p-1 w-full mb-2 shadow-sm"
        onChange={(e) => handleChange(e.target.value, field)}
        value={value}
        style={error?.field == field ? { borderColor: "red" } : {}}
      />
      <FormError error={error} field={field} />
    </>
  );
};
