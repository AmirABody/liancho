import React from "react";
import { FieldError } from "react-hook-form/dist/types/errors";

interface InputProps {
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode | null;
  error?: FieldError | null;
  invalid?: boolean;
}

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { name, type = "text", label, value, onChange, onBlur, icon = null, error = null, invalid },
  ref
) {
  return (
    <div>
      <div className="relative mt-9">
        <input
          className={`peer relative block w-full bg-gray-400/70 ${value && !invalid ? "bg-blue-400" : ""} ${
            invalid ? "border border-red-500" : ""
          } focus:bg-blue-500 text-white rounded-md py-3 px-2 transition-all`}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
        <label className="block absolute -top-9 text-gray-500 peer-focus:text-blue-400 dark:text-gray-100 font-medium text-lg" htmlFor={name}>
          {label}
        </label>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 ml-1 cursor-pointer">{icon}</div>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
});
