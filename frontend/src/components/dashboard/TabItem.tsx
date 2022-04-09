interface TabItemProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  selected?: boolean;
  onChange?: (value: string) => void;
}

export default function TabItem({ id, title, icon, selected, onChange }: TabItemProps) {
  const handleClick = () => {
    if (!selected) onChange!(id);
  };

  return (
    <div
      className={`w-full flex items-center gap-x-3 ${
        selected ? "bg-blue-400/20 dark:bg-blue-400/10 text-blue-500 border-r-[6px] border-blue-500" : " text-gray-500 dark:text-gray-50 hover:bg-blue-300/10 dark:hover:bg-blue-400/5"
      } py-3 px-5 cursor-pointer transition-all`}
      onClick={handleClick}
    >
      {icon}
      <span className="text-lg font-medium">{title}</span>
    </div>
  );
}
