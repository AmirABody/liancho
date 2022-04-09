import { Icon } from "@iconify/react";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { DashboardTab } from "../../interfaces";
import IconButton from "../buttons/IconButton";
import Tooltip from "../Tooltip";
import Avatar from "./Avatar";
import TabItem from "./TabItem";
import TabMenu from "./TabMenu";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const [openTab, setOpenTab] = useState<DashboardTab>("overview");

  const handleTabChange = (value: string) => {
    setOpenTab(value as DashboardTab);
  };

  return (
    <aside className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-800/50 col-span-2 h-screen relative">
      <div className="w-[344px] h-[309px] bg-gray-200 dark:bg-gray-500 opacity-60 dark:opacity-40 rounded-full absolute -z-0 top-5 -right-10 translate-x-1/2 -translate-y-1/2" />
      <div className="flex flex-col items-center p-4">
        <div className="w-full flex justify-between items-center">
          <IconButton
            className="hover:bg-gray-200 dark:hover:bg-gray-500/50 text-gray-700 dark:text-gray-50"
            icon={<Icon icon="ep:more-filled" width="22" />}
            rippleColor="#9ca3af"
            onClick={(e) => {}}
          />
          <Tooltip text={theme === "light" ? 'حالت شب' : 'حالت روز'}>
          <IconButton
            className="hover:bg-gray-200 dark:hover:bg-gray-500/50"
            icon={
              theme === "light" ? (
                <Icon icon="akar-icons:moon" color="#3b82f6" width="20" />
              ) : (
                <Icon icon="icomoon-free:sun" color="#3b82f6" width="20" />
              )
            }
            rippleColor="#9ca3af"
            onClick={toggleTheme}
          />
          </Tooltip>
        </div>
        <Avatar fullName="مهدی امیرآبادی" picture={require("../../pages/Sample Avatar.jpg")} />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="w-full flex items-center gap-x-3 bg-gray-500/20 dark:bg-gray-800/40 text-gray-700 dark:text-gray-50 py-3 px-3">
          <Icon icon="ci:menu-alt-05" width="22" />
          <span className="text-lg font-medium">منو</span>
        </div>
        <TabMenu openTab={openTab} onChange={handleTabChange}>
          <TabItem id="overview" title="نمای کلی" icon={<Icon icon="grommet-icons:overview" width="22" />} />
          <TabItem id="tasks" title="تکالیف" icon={<Icon icon="fluent:tasks-app-28-regular" width="22" />} />
          <TabItem id="reports" title="گزارش‌ها" icon={<Icon icon="iconoir:stats-report" width="22" />} />
          <TabItem id="infography" title="داده نما" icon={<Icon icon="icon-park-outline:timeline" width="22" />} />
        </TabMenu>
      </div>
      <div className="flex flex-col gap-y-2 mt-4">
        <div className="w-full flex items-center gap-x-3 bg-gray-500/20 dark:bg-gray-800/40 text-gray-700 dark:text-gray-50 py-3 px-3">
          <Icon icon="carbon:categories" width="22" />
          <span className="text-lg font-medium">دسته بندی‌ها</span>
        </div>
      </div>
    </aside>
  );
}
