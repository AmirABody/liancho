import React from "react";

interface IconButtonGroupProps {
  className?: string;
  selectedClassName?: string;
  children: React.ReactElement[];
  state: string;
  onChange: (value: string) => void;
}

export default function IconButtonGroup({
  className,
  selectedClassName,
  children,
  state,
  onChange,
}: IconButtonGroupProps) {
  return (
    <div className={`flex items-center rounded-full overflow-hidden transition-all ${className}`}>
      {React.Children.map(children, (child) => {
        let selected = child.props.id === state;
        let onClick = () => {
          if (!selected) onChange(child.props.id);
        };

        return React.cloneElement(child, {
          className: `px-2 py-1 ${selected ? selectedClassName : ""}`,
          onClick,
        });
      })}
    </div>
  );
}
