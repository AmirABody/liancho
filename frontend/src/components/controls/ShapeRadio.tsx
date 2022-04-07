import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface ShapeRadioProps {
  name?: string;
  value: string;
  color: string;
  width: number;
  selected?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default React.forwardRef<HTMLInputElement, ShapeRadioProps>(function ShapeRadio(
  { name, value, color, width, selected, disabled = false, onChange },
  ref
) {
  return (
    <div>
      <label className={`${disabled ? '' : 'cursor-pointer'}`}>
        <input
          className="hidden absolute"
          name={name}
          type="radio"
          value={value}
          onChange={onChange}
          ref={ref}
          disabled={disabled}
        />
        <span
          className="relative block aspect-square rounded-full"
          style={{ backgroundColor: color, width: `${width}px`, opacity: disabled ? 0.2 : 1 }}
        >
          <AnimatePresence>
            {selected && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="absolute -top-1 -right-1 aspect-square border-2 rounded-full"
                style={{ borderColor: color, width: `${width + 8}px` }}
              />
            )}
          </AnimatePresence>
        </span>
      </label>
    </div>
  );
});
