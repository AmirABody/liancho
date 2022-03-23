import { useState } from "react";

export default function useForm<T>(
  initialFValues: T,
  validateOnChange: boolean,
  validate: (fieldValues: Partial<T>) => boolean | void
) {
  const [values, setValues] = useState<T>(initialFValues);
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (validateOnChange) {
      validate({ [name]: value } as {} as Partial<T>);
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}


