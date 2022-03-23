import React, { useRef } from "react";
import Ripple from "./Ripple";

interface RefObject {
  addRipple: (e: React.MouseEvent<HTMLElement>) => void;
}

interface IconButtonProps {
  className?: string;
  icon: React.ReactNode;
  rippleColor: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function IconButton({ className, icon, rippleColor, onClick }: IconButtonProps) {
  const childRef = useRef<RefObject>();

  const handleClickEvent = (e: React.MouseEvent<HTMLElement>) => {
    childRef.current?.addRipple(e);
    onClick(e);
  };

  return (
    <button
      type="button"
      className={`p-2 rounded-full overflow-hidden relative transition-all ${className}`}
      onClick={handleClickEvent}
    >
      <Ripple ref={childRef} color={rippleColor} />
      <span className="relative z-10 flex items-center justify-center">{icon}</span>
    </button>
  );
}
