import { Icon } from "@iconify/react";

interface CheckboxProps {
  name: string;
  label: string;
  value: boolean;
  onToggleCheck: () => void;
}

export default function Checkbox({ name, label, value, onToggleCheck }: CheckboxProps) {
  return (
    <div className="group flex gap-x-3 items-center cursor-pointer" onClick={onToggleCheck}>
      <input className="peer hidden absolute" type="checkbox" name={name} checked={value} onChange={() => {}}/>
      <span className="w-4 aspect-square bg-gray-400/70 rounded-sm group-hover:bg-blue-400/70 peer-checked:hidden transition-all" />
      <Icon className="hidden peer-checked:block" icon="carbon:checkbox-checked-filled" color="#60a5fa" width={21.25} />
      <label className="text-gray-500 dark:text-gray-100 text-lg font-medium cursor-pointer">
        {label}
      </label>
    </div>
  );
}
