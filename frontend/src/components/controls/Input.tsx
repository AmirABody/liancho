interface InputProps {
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode | null;
  error?: string | null;
}

export default function Input({
  name,
  type = "text",
  label,
  value,
  onChange,
  icon = null,
  error = null,
  ...others
}: InputProps) {
  return (
    <div>
      <label className="block text-gray-500 dark:text-gray-100 font-medium text-lg mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          className={`relative block w-full bg-gray-400/70 ${
            value ? "bg-blue-400" : ""
          } focus:bg-blue-500 text-white rounded-md py-3 px-2 transition-all`}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          {...others}
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 ml-1 cursor-pointer">{icon}</div>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
