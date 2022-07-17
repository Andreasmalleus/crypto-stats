import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, Fragment, useState } from "react";
import Router, { useRouter } from "next/router";
import { FormInput } from "./FormInput";
import { FieldError } from "../../types";

export type InputType = {
  value: string;
  type?: string;
  field: string;
  setter: (v: string) => void;
  title: string;
};

interface FormComponentProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputs: InputType[];
  title: string;
  error: FieldError;
}

export const Form: React.FC<FormComponentProps> = ({
  handleSubmit,
  inputs,
  title,
  error,
  children,
}) => {
  return (
    <form
      className="flex justify-center items-center h-full"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="w-1/6">
        <h1 className="font-headings text-2xl text-center mb-6">Sign up</h1>
        {inputs.map(({ value, field, setter, type, title }: InputType) => (
          <Fragment key={field}>
            <div className="mb-1 text-sm">{title}</div>
            <FormInput
              value={value}
              field={field}
              setValue={setter}
              error={error}
              type={type}
            />
          </Fragment>
        ))}
        <button className="btn-primary mt-3 mb-5 shadow-md">{title}</button>
        {children}
      </div>
    </form>
  );
};
