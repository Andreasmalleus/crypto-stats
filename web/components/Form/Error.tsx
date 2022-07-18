import { FieldError } from "../../types";

interface FormErrorProps {
  error: FieldError;
  field: string;
}

export const FormError: React.FC<FormErrorProps> = ({ error, field }) => {
  return (
    <div className="text-red-400 text-xs mb-2">
      {error && error.field == field ? error.message : null}
    </div>
  );
};
