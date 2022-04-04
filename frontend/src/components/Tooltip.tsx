import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactElement;
}

export default React.forwardRef<HTMLElement, TooltipProps>(function Tooltip({ text, children, ...others }, ref) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="relative">
      <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        {React.cloneElement(children, { ...others, ref })}
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0.8, scale: 0.8, x: '-50%', y: 10 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bg-gray-500 text-white text-sm px-1 py-[1px] rounded top-full left-1/2 z-[1000]"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
