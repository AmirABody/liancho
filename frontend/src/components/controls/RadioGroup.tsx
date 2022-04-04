import React from "react";

interface RadioGroupProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactElement[];
}

export default React.forwardRef<HTMLInputElement, RadioGroupProps>(function RadioGroup(
  { name, label, value, onChange, children },
  ref
) {
  return (
    <div className="flex items-center gap-x-3">
      <span className="text-gray-500 dark:text-gray-100 text-lg font-medium">{label}</span>
      {React.Children.map(children, (child: React.ReactElement) =>
        React.cloneElement(child, {
          name,
          onChange,
          ref,
          selected: value === (child.props.value || child.props.children.props.value),
        })
      )}
    </div>
  );
});
