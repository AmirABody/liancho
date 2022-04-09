import moment from "jalali-moment";
import { Icon } from "@iconify/react";
import { PriorityColors, Task } from "../../interfaces";

interface TasksTableProps {
  tasks: Task[];
  selectedTasks: string[];
  setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TasksTable({ tasks, selectedTasks, setSelectedTasks }: TasksTableProps) {
  const handleClick = (taskId: string) => {
    setSelectedTasks((prev: string[]) => {
      if (!prev.includes(taskId)) return [...prev, taskId];
      else return prev.filter((id) => id !== taskId);
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-gray-700 dark:text-gray-50 font-semibold bg-gray-200 dark:bg-gray-900/80">
            <th className="w-1 bg-transparent px-0"></th>
            <th className="w-[500px] text-right">عنوان تکلیف</th>
            <th className="w-[180px]">دسته‌بندی</th>
            <th className="w-[180px]">تاریخ</th>
            <th className="w-[70px]">یادآور</th>
            <th className="w-[40px] px-0"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: Task) => {
            const isSelected = selectedTasks.includes(task._id!);
            return (
              <tr
                key={task._id}
                className={`${isSelected ? 'bg-gray-200/80 dark:bg-gray-800 scale-[.99]' : 'bg-gray-100 dark:bg-gray-800/70 hover:bg-gray-200/60 dark:hover:bg-gray-800/90'} text-gray-500 dark:text-gray-50 font-semibold cursor-pointer transition-all`}
                onClick={(e) => handleClick(task._id!)}
              >
                <td className="px-0" style={{ backgroundColor: PriorityColors[task.priority] }} />
                <td className="text-right">{task.title}</td>
                <td>
                  <div className="flex items-center justify-center gap-x-[10px]" style={{ color: task.category.color }}>
                    <span
                      className="inline-block w-5 aspect-square rounded-full"
                      style={{ backgroundColor: task.category.color }}
                    ></span>
                    <span>{task.category.title}</span>
                  </div>
                </td>
                <td>{moment(task.dueDate).locale("fa").format("ddd D MMMM")}</td>
                <td className={task.reminder ? "text-green-500" : "text-red-500"}>
                  <Icon
                    icon={task.reminder ? "charm:circle-tick" : "fontisto:close"}
                    width="20"
                    style={{ display: "inline" }}
                  />
                </td>
                <td className="px-0 text-blue-500">
                  <Icon icon="clarity:alarm-clock-solid-alerted" width="20" style={{ display: "inline" }} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
