import { Icon } from "@iconify/react";
import React, { useContext, useState } from "react";
import IconButton from "../components/buttons/IconButton";
import AddTaskModal from "../components/dashboard/AddTaskModal";
import Avatar from "../components/dashboard/Avatar";
import HeaderSection from "../components/dashboard/HeaderSection";
import TabItem from "../components/dashboard/TabItem";
import TabMenu from "../components/dashboard/TabMenu";
import TasksSection from "../components/dashboard/TasksSection";
import { ThemeContext } from "../contexts/ThemeContext";
import { DashboardTab } from "../interfaces";

export default function Dashboard() {
  const { theme, setTheme } = useContext(ThemeContext)!;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const [openTab, setOpenTab] = useState<DashboardTab>("overview");
  const [modal, setModal] = useState<string>("");

  const handleTabChange = (value: string) => {
    setOpenTab(value as DashboardTab);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-x-5 bg-gray-100">
        <aside className="bg-gray-50 border border-gray-200 col-span-2 h-screen relative">
          <div className="w-[344px] h-[309px] bg-gray-200 opacity-60 rounded-full absolute -z-0 top-5 -right-10 translate-x-1/2 -translate-y-1/2" />
          <div className="flex flex-col items-center p-4">
            <div className="w-full flex justify-between items-center">
              <IconButton
                className="hover:bg-gray-200"
                icon={<Icon icon="ep:more-filled" color="#374151" width="22" />}
                rippleColor="#9ca3af"
                onClick={(e) => {}}
              />
              <IconButton
                className="hover:bg-gray-200"
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
            </div>
            <Avatar fullName="مهدی امیرآبادی" picture={require("./Sample Avatar.jpg")} />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="w-full flex items-center gap-x-3 bg-gray-500/20 text-gray-700 py-3 px-3">
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
            <div className="w-full flex items-center gap-x-3 bg-gray-500/20 text-gray-700 py-3 px-3">
              <Icon icon="carbon:categories" width="22" />
              <span className="text-lg font-medium">دسته بندی‌ها</span>
            </div>
          </div>
        </aside>
        <div className="col-span-10 w-full pl-5 py-4">
          <div className="grid grid-cols-10 gap-5">
            <HeaderSection />
            <TasksSection setModal={setModal} />
          </div>
        </div>
      </div>
      {modal === "addTask" && <AddTaskModal setModal={setModal} />}
    </>
  );
}
