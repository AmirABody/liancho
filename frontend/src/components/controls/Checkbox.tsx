import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

interface CheckboxProps {
  name: string;
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
}

const tickVariants = {
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

export default React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { name, label, value, onBlur, onChange },
  ref
) {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <div>
      <label className="inline-flex items-center gap-x-2 align-middle group text-gray-500 dark:text-gray-100 text-lg font-medium cursor-pointer">
        <input
          type="checkbox"
          className="peer hidden absolute"
          name={name}
          checked={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
        <span className="inline-block w-4 aspect-square bg-gray-400/70 rounded-sm group-hover:bg-blue-400/70 peer-checked:bg-blue-500 transition-all">
          <motion.svg
            initial={value}
            animate={value ? "checked" : "unchecked"}
            viewBox="0 0 16 16"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path d="M 5 10 L 8 12 L 12 3.5" variants={tickVariants} style={{ pathLength, opacity }} />
          </motion.svg>
        </span>
        <span>{label}</span>
      </label>
    </div>
  );
});
