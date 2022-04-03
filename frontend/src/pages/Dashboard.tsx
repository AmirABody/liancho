import { Icon } from "@iconify/react";
import React, { useState } from "react";
import IconButton from "../components/buttons/IconButton";
import Avatar from "../components/dashboard/Avatar";
import TabItem from "../components/dashboard/TabItem";
import TabMenu from "../components/dashboard/TabMenu";
import { DashboardTab } from "../interfaces";

export default function Dashboard() {
  const [openTab, setOpenTab] = useState<DashboardTab>("overview");

  const handleTabChange = (value: string) => {
    setOpenTab(value as DashboardTab);
  };

  return (
    <div className="grid grid-cols-12 gap-x-5">
      <aside className="bg-gray-50 border border-gray-200 col-span-2 h-screen relative">
        <div className="w-[344px] h-[309px] bg-gray-200 opacity-60 rounded-full absolute -z-0 top-5 -right-10 translate-x-1/2 -translate-y-1/2" />
        <div className="flex flex-col items-center p-4">
          <IconButton
            className="hover:bg-gray-200 self-start"
            icon={<Icon icon="ep:more-filled" color="#374151" width="22" />}
            rippleColor="#9ca3af"
            onClick={(e) => {}}
          />
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
    </div>
  );
}
