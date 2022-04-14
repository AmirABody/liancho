import { Icon } from "@iconify/react";

interface AvatarProps {
  fullName: string;
  picture?: string;
}

export default function Avatar({ fullName, picture }: AvatarProps) {
  return (
    <div className="flex flex-col items-center gap-y-3 z-10">
      <div className="w-[100px] aspect-square rounded-full overflow-hidden border-[5px] border-gray-100 dark:border-gray-800 shadow-7">
        {picture ? (
          <img className="w-full h-full object-contain" src={picture} alt="avatar" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-blue-400 dark:text-white">
            <Icon icon="carbon:user-avatar-filled-alt" width={120} />
          </div>
        )}
      </div>
      <span className="text-lg font-semibold text-gray-800 dark:text-gray-50">{fullName}</span>
    </div>
  );
}
