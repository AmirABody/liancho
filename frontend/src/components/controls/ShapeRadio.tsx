import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface ShapeRadioProps {
  name?: string;
  value: string;
  color: string;
  selected?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default React.forwardRef<HTMLInputElement, ShapeRadioProps>(function ShapeRadio(
  { name, value, color, selected, onChange },
  ref
) {
  return (
    <div>
      <label className="cursor-pointer">
        <input className="hidden absolute" name={name} type="radio" value={value} onChange={onChange} ref={ref} />
        <span className="relative block w-10 aspect-square rounded-full" style={{ backgroundColor: color }}>
          <AnimatePresence>
            {selected && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="absolute w-12 -top-1 -right-1 aspect-square border-2 rounded-full"
                style={{ borderColor: color }}
              />
            )}
          </AnimatePresence>
        </span>
      </label>
    </div>
  );
});
