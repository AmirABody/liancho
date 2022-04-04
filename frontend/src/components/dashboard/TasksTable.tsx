import { Icon } from "@iconify/react";
import { Task } from "../../interfaces";
import { useTasks } from "../../pages/task-api/hooks-api";

export default function TasksTable() {
  const { tasks, isLoading, isSuccess, error } = useTasks();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-gray-700 font-semibold bg-gray-200">
            <th className="w-10 text-[10px] px-0">
              <span className="-rotate-45">اولویت</span>
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
              <tr className="text-gray-500 font-semibold bg-gray-100 hover:bg-gray-200/80 transition-all">
                <td className="px-0" />
                <td className="text-right">{task.title}</td>
                <td>
                  <div className="flex items-center gap-x-[10px]" style={{ color: task.category.color }}>
                    <span
                      className="inline-block w-5 aspect-square rounded-full"
                      style={{ backgroundColor: task.category.color }}
                    ></span>
                    <span>{task.category.title}</span>
                  </div>
                </td>
                <td>{task.dueDate}</td>
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
          <tr className="text-gray-500 font-semibold bg-gray-100 hover:bg-gray-200/80 transition-all">
            <td className="px-0 bg-red-500"></td>
            <td className="text-right">طراحی سایت LianCho</td>
            <td>
              <div className="flex items-center gap-x-[10px] text-blue-700">
                <span className="inline-block w-5 aspect-square rounded-full bg-blue-700"></span>
                <span>کار شخصی</span>
              </div>
            </td>
            <td>سه شنبه ۱۵ بهمن</td>
            <td className="text-green-500">
              <Icon icon="charm:circle-tick" width="20" style={{ display: "inline" }} />
            </td>
            <td className="px-0 text-blue-500">
              <Icon icon="clarity:alarm-clock-solid-alerted" width="20" style={{ display: "inline" }} />
            </td>
          </tr>
          <tr className="text-gray-500 font-semibold bg-gray-100 hover:bg-gray-200/80 transition-all">
            <td className="px-0 bg-red-500"></td>
            <td className="text-right">طراحی سایت LianCho</td>
            <td>
              <div className="flex items-center gap-x-[10px] text-blue-700">
                <span className="inline-block w-5 aspect-square rounded-full bg-blue-700"></span>
                <span>کار شخصی</span>
              </div>
            </td>
            <td>سه شنبه ۱۵ بهمن</td>
            <td className="text-green-500">
              <Icon icon="charm:circle-tick" width="20" style={{ display: "inline" }} />
            </td>
            <td className="px-0 text-blue-500">
              <Icon icon="clarity:alarm-clock-solid-alerted" width="20" style={{ display: "inline" }} />
            </td>
          </tr>
          <tr className="text-gray-500 font-semibold bg-gray-100 hover:bg-gray-200/80 transition-all">
            <td className="px-0 bg-red-500"></td>
            <td className="text-right">طراحی سایت LianCho</td>
            <td>
              <div className="flex items-center gap-x-[10px] text-blue-700">
                <span className="inline-block w-5 aspect-square rounded-full bg-blue-700"></span>
                <span>کار شخصی</span>
              </div>
            </td>
            <td>سه شنبه ۱۵ بهمن</td>
            <td className="text-green-500">
              <Icon icon="charm:circle-tick" width="20" style={{ display: "inline" }} />
            </td>
            <td className="px-0 text-blue-500">
              <Icon icon="clarity:alarm-clock-solid-alerted" width="20" style={{ display: "inline" }} />
            </td>
          </tr>
          <tr className="text-gray-500 font-semibold bg-gray-100 hover:bg-gray-200/80 transition-all">
            <td className="px-0 bg-red-500"></td>
            <td className="text-right">طراحی سایت LianCho</td>
            <td>
              <div className="flex items-center gap-x-[10px] text-blue-700">
                <span className="inline-block w-5 aspect-square rounded-full bg-blue-700"></span>
                <span>کار شخصی</span>
              </div>
            </td>
            <td>سه شنبه ۱۵ بهمن</td>
            <td className="text-green-500">
              <Icon icon="charm:circle-tick" width="20" style={{ display: "inline" }} />
            </td>
            <td className="px-0 text-blue-500">
              <Icon icon="clarity:alarm-clock-solid-alerted" width="20" style={{ display: "inline" }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
