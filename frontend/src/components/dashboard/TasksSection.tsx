import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { useTheme } from "../../contexts/ThemeContext";
import { Modal as ModalType, Task } from "../../interfaces";
import { deleteTasks } from "../../pages/task-api/api";
import { useTasks } from "../../pages/task-api/hooks-api";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import IconButtonGroup from "../buttons/IconButtonGroup";
import { alert } from "../ConfirmAlert";
import { toast } from "../CustomToast";
import Tooltip from "../Tooltip";
import Card from "./Card";
import TasksGrid from "./TasksGrid";
import TasksTable from "./TasksTable";

type TasksView = "list" | "grid";

interface TasksSectionProps {
  setModal: Dispatch<SetStateAction<ModalType | null>>;
}

export default function TasksSection({ setModal }: TasksSectionProps) {
  const { theme } = useTheme();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation((ids: string[]) => deleteTasks(ids), {
    onError: (error, variables, context) => {
      let message = (error as any).response.data.message.fr;
      toast({ type: "error", message });
    },
    onSuccess: (data, variables, context) => {
      toast({ type: "success", message: "تکالیف با موفقیت حذف شدند!" });
      queryClient.invalidateQueries("tasks");
    },
  });

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const { tasks, isLoading, isSuccess, error } = useTasks();

  const [tasksView, setTasksView] = useState<TasksView>("list");

  const handleViewChange = (value: string) => {
    setTasksView(value as TasksView);
  };

  const handleDelete = () => {
    if (selectedTasks.length > 0) {
      alert({
        text: "آیا اطمینان از حذف دارید؟",
        action: () => {
          return deleteMutation.mutateAsync(selectedTasks);
        },
      });
    }
    setSelectedTasks([]);
  };

  const handleEdit = () => {
    if (selectedTasks.length === 1) {
      let task = tasks.find((task: Task) => task._id === selectedTasks[0]);
      setModal({ type: "editTask", payload: { task } });
    }
    setSelectedTasks([]);
  };

  return (
    <Card className="col-span-10">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[22px] font-semibold text-gray-800 dark:text-gray-50">تکالیف</span>
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-[2px]">
            <Tooltip text="ویرایش">
              <IconButton
                className="hover:bg-gray-100 dark:hover:bg-gray-500/50 text-blue-500"
                icon={<Icon icon="clarity:edit-line" width="20" />}
                rippleColor="rgba(255, 255, 255, 0.5)"
                onClick={handleEdit}
              />
            </Tooltip>
            <Tooltip text="حذف">
              <IconButton
                className="hover:bg-gray-100 dark:hover:bg-gray-500/50 text-red-600"
                icon={<Icon icon="bi:trash" width="20" />}
                rippleColor="rgba(255, 255, 255, 0.5)"
                onClick={handleDelete}
              />
            </Tooltip>
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
            className="text-green-500 dark:text-white dark:bg-green-500 border-2 border-green-500 dark:border-none hover:bg-green-500 hover:text-white font-semibold py-[2px] dark:py-1"
            text="افزودن تکلیف"
            rippleColor="white"
            endIcon={<Icon icon="akar-icons:plus" width="22" />}
            onClick={() => {
              setModal({ type: "addTask" });
            }}
          />
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center py-28">
          <BeatLoader size={30} margin={5} color={theme === "light" ? "#4b5563" : "#9ca3af"} />
        </div>
      )}
      {tasksView === "list" && isSuccess && (
        <TasksTable tasks={tasks} selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
      )}
      {tasksView === "grid" && isSuccess && <TasksGrid tasks={tasks} setSelectedTasks={setSelectedTasks} />}
    </Card>
  );
}
