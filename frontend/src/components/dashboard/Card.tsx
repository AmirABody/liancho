interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return <div className={`bg-white rounded-[10px] shadow-8 px-5 py-4 ${className}`}>{children}</div>;
}
