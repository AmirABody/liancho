interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return <div className={`bg-white dark:bg-gray-700 rounded-[10px] shadow-8 px-5 py-4 ${className}`}>{children}</div>;
}
