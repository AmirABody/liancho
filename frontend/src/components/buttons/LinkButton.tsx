import React from "react";

interface LinkButtonProps {
  text: string;
  onClick: (e: React.MouseEvent) => void;
}

export default function LinkButton({ text, onClick }: LinkButtonProps) {
  return (
    <button
      type="button"
      className="self-end w-fit text-gray-700 dark:text-white hover:text-blue-400 dark:hover:text-blue-400 focus:text-blue-300 dark:focus:text-blue-300 underline underline-offset-4 transition-all -mt-4"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
