import React, { useState } from "react";
import AddTaskModal from "../components/dashboard/AddTaskModal";
import HeaderSection from "../components/dashboard/HeaderSection";
import Sidebar from "../components/dashboard/Sidebar";
import TasksSection from "../components/dashboard/TasksSection";

export default function Dashboard() {
  const [modal, setModal] = useState<string>("");

  return (
    <>
      <div className="grid grid-cols-12 gap-x-5 bg-gray-100 dark:bg-gray-600/90">
        <Sidebar />
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
