import React, { useRef } from "react";
import Ripple from "./Ripple";

interface RefObject {
  addRipple: (e: React.MouseEvent<HTMLElement>) => void;
}

interface ButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  rippleColor: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

function Button({
  className = "",
  type = "button",
  text,
  rippleColor,
  startIcon = null,
  endIcon = null,
  onClick,
  ...others
}: ButtonProps) {
  const childRef = useRef<RefObject>();

  const handleClickEvent = (e: React.MouseEvent<HTMLElement>) => {
    childRef.current?.addRipple(e);
    onClick && onClick(e);
  };

  return (
    <button
      type={type}
      className={`px-3 py-1 rounded-full overflow-hidden relative transition-all ${className}`}
      onClick={handleClickEvent}
      {...others}
    >
      <Ripple ref={childRef} color={rippleColor} />
      <span className="relative z-10 flex items-center justify-center gap-x-3">
        {startIcon}
        {text}
        {endIcon}
      </span>
    </button>
  );
}

export default Button;
