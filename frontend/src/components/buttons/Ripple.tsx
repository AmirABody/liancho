import React, { useState, useLayoutEffect, forwardRef, useImperativeHandle } from "react";
import Color from "color"

interface Coords {
  x: number;
  y: number;
}

interface RippleProps {
  color: string;
}

function useDebouncedRippleCleanUp(rippleCount: number, duration: number, cleanUpFunction: () => void) {
  let bounce: ReturnType<typeof setTimeout>;

  useLayoutEffect(() => {
    if (rippleCount > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 4);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
}

const Ripple = forwardRef(({ color }: RippleProps, ref) => {
  const [rippleArray, setRippleArray] = useState<Coords[]>([]);

  useDebouncedRippleCleanUp(rippleArray.length, 1000, () => setRippleArray([]));

  useImperativeHandle(ref, () => ({
    addRipple(e: React.MouseEvent<HTMLElement>) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newRipple = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      setRippleArray([...rippleArray, newRipple]);
    },
  }));

  return (
    <>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => (
          <span
            key={index}
            className="w-1 h-1 absolute z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full animate-ripple"
            style={{ top: ripple.y, left: ripple.x, backgroundColor: color }}
          />
        ))}
    </>
  );
});

export default Ripple;
