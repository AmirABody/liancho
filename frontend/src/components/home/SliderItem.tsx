interface SliderItemProps {
  title: string;
  color: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

export default function SliderItem({ title, color, children, icon }: SliderItemProps) {
  return (
    <div className="w-96 flex flex-col gap-y-5 border-[3px] dark:border-0 rounded-md p-[1.8rem] relative text-center mx-auto dark:bg-gray-600" style={{ borderColor: color }}>
      <div
        className="w-20 aspect-square rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: color }}
      >
        <div className="flex items-center justify-center w-full h-full text-white text-[3.25rem]">{icon}</div>
      </div>
      <h3 className="text-2xl font-semibold mt-6" style={{ color }}>
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-200 text-lg font-medium leading-8">{children}</p>
    </div>
  );
}
