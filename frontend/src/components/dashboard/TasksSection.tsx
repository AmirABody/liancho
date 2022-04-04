import { Icon } from "@iconify/react";
import { useState } from "react";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import IconButtonGroup from "../buttons/IconButtonGroup";
import Card from "./Card";
import TasksTable from "./TasksTable";

type TasksView = "list" | "grid";

interface TasksSectionProps {
  setModal: (modal: string) => void;
}

export default function TasksSection({ setModal }: TasksSectionProps) {
  const [tasksView, setTasksView] = useState<TasksView>("list");

  const handleViewChange = (value: string) => {
    setTasksView(value as TasksView);
  };

  return (
    <Card className="col-span-10">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[22px] font-semibold text-gray-800">تکالیف</span>
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-[2px]">
            <IconButton
              className="hover:bg-gray-100 text-blue-500"
              icon={<Icon icon="clarity:edit-line" width="20" />}
              rippleColor="rgba(255, 255, 255, 0.5)"
              onClick={(e) => {}}
            />
            <IconButton
              className="hover:bg-gray-100 text-red-600"
              icon={<Icon icon="bi:trash" width="20" />}
              rippleColor="rgba(255, 255, 255, 0.5)"
              onClick={(e) => {}}
            />
          </div>
          <IconButtonGroup
            className="text-gray-400/80 bg-gray-100"
            selectedClassName="bg-gray-500/90 text-white"
            state={tasksView}
            onChange={handleViewChange}
          >
            <button id="list">
              <Icon icon="fa-solid:list" />
            </button>
            <button id="grid">
              <Icon icon="bi:grid-3x3-gap-fill" />
            </button>
          </IconButtonGroup>
          <Button
            className="text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white font-semibold py-[2px]"
            text="افزودن تکلیف"
            rippleColor="white"
            endIcon={<Icon icon="akar-icons:plus" width="22" />}
            onClick={() => {setModal("addTask")}}
          />
        </div>
      </div>
      {tasksView === "list" && <TasksTable />}
    </Card>
  );
}
