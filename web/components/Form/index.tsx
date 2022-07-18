import { FormEvent, Fragment } from "react";
import { FormInput } from "./Input";
import { FieldError } from "../../types";

export type InputType = {
  value: string;
  type?: string;
  field: string;
  title?: string;
};

interface FormComponentProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputs: InputType[];
  title: string;
  error: FieldError;
  handleChange: (payload: string, field: string) => void;
}

export const Form: React.FC<FormComponentProps> = ({
  handleSubmit,
  inputs,
  title,
  error,
  children,
  handleChange,
}) => {
  return (
    <form
      className="flex justify-center items-center h-full"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="w-1/6">
        <h1 className="font-headings text-2xl text-center mb-6">Sign up</h1>
        {inputs.map(({ value, field, type, title }: InputType) => {
          const formattedTitle = title
            ? title
            : field.charAt(0).toUpperCase() + field.slice(1);

          console.log(title);
          return (
            <Fragment key={field}>
              <div className="mb-1 text-sm">{formattedTitle} </div>
              <FormInput
                value={value}
                field={field}
                handleChange={handleChange}
                error={error}
                type={type}
              />
            </Fragment>
          );
        })}
        <button className="btn-primary mt-3 mb-5 shadow-md">{title}</button>
        {children}
      </div>
    </form>
  );
};
