import moment from "jalali-moment";
import { Icon } from "@iconify/react";
import { PriorityColors, Task } from "../../interfaces";
import { useTasks } from "../../pages/task-api/hooks-api";

export default function TasksTable() {
  const { tasks, isLoading, isSuccess, error } = useTasks();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-gray-700 font-semibold bg-gray-200">
            <th className="w-9 text-[10px] px-0">
              اولویت
            </th>
            <th className="w-[500px] text-right">عنوان تکلیف</th>
            <th className="w-[150px]">دسته‌بندی</th>
            <th className="w-[150px]">تاریخ</th>
            <th className="w-[80px]">یادآور</th>
            <th className="w-[40px] px-0"></th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            tasks.map((task: Task) => (
              <tr key={task._id} className="text-gray-500 font-semibold bg-gray-100 hover:bg-gray-200/80 transition-all">
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
                <td>{moment(task.dueDate).locale('fa').format('ddd D MMMM')}</td>
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
            ))}
        </tbody>
      </table>
    </div>
  );
}
