import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface ShapeRadioProps {
  name?: string;
  value: string;
  color: string;
  width: number;
  selected?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default React.forwardRef<HTMLInputElement, ShapeRadioProps>(function ShapeRadio(
  { name, value, color, width, selected, onChange },
  ref
) {
  return (
    <div>
      <label className="cursor-pointer">
        <input className="hidden absolute" name={name} type="radio" value={value} onChange={onChange} ref={ref} />
        <span
          className="relative block aspect-square rounded-full"
          style={{ backgroundColor: color, width: `${width}px` }}
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
