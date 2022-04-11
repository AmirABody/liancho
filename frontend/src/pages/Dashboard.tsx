import React, { useState } from "react";
import TaskModal from "../components/dashboard/TaskModal";
import HeaderSection from "../components/dashboard/HeaderSection";
import Sidebar from "../components/dashboard/Sidebar";
import TasksSection from "../components/dashboard/TasksSection";
import { Modal } from "../interfaces";

export default function Dashboard() {
  const [modal, setModal] = useState<Modal | null>(null);

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
      {modal?.type === "addTask" && <TaskModal setModal={setModal} type="add" />}
      {modal?.type === "editTask" && <TaskModal setModal={setModal} type="edit" toBeUpdTask={modal.payload.task} />}
    </>
  );
}
