import { Icon } from "@iconify/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Task, PriorityColors, Category, CategoryColors, Modal as ModalType } from "../../interfaces";
import Controls from "../controls/Controls";
import ShapeRadio from "../controls/ShapeRadio";
import RadioGroup from "../controls/RadioGroup";
import Modal from "../Modal";
import Tooltip from "../Tooltip";
import Button from "../buttons/Button";
import { useToggle } from "react-use";
import CategoryPanel from "./CategoryPanel";
import { useCats } from "../../pages/cat-api/hooks-api";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { setTask, editTask } from "../../pages/task-api/api";
import { toast } from "../CustomToast";
import { PuffLoader } from "react-spinners";
import { Dispatch, SetStateAction } from "react";

interface TaskModalProps {
  setModal: Dispatch<SetStateAction<ModalType | null>>;
  type: "add" | "edit";
  toBeUpdTask?: Task;
}

type FieldValuesType = Exclude<Task, "time">;

export default function TaskModal({ setModal, type, toBeUpdTask }: TaskModalProps) {
  const queryClient = useQueryClient();

  const { cats, isLoading, isSuccess, error } = useCats();

  const mutation = useMutation((task: Task) => (type === "add" ? setTask(task) : editTask(toBeUpdTask!._id!, task)), {
    onError: (error, variables, context) => {
      let message = (error as any).response.data.message.fr;
      toast({ type: "error", message });
    },
    onSuccess: (data, variables, context) => {
      let message = type === "add" ? "تکلیف با موفقیت ساخته شد!" : "تکلیف با موفقیت ویرایش شد!";
      toast({ type: "success", message });
      queryClient.invalidateQueries("tasks");
      setModal(null);
    },
  });

  const [categoryPanel, toggleCategoryPanel] = useToggle(false);

  const { control, handleSubmit } = useForm<FieldValuesType>({
    defaultValues:
      type === "add"
        ? {
            priority: "medium",
            title: "",
            category: null!,
            dueDate: new Date(),
            reminder: false,
          }
        : toBeUpdTask,
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FieldValuesType> = (values) => {
    const taskData = {
      priority: values.priority,
      title: values.title,
      category: values.category,
      dueDate: values.dueDate,
      reminder: values.reminder,
      time: type === "add" ? 0 : toBeUpdTask!.time,
    };
    mutation.mutate(taskData);
  };

  return (
    <Modal setModal={setModal}>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-[1.3rem] font-semibold text-gray-800 dark:text-white">
            {type === "add" ? "افزودن تکلیف" : "ویرایش تکلیف"}
          </h1>
          <button onClick={() => setModal(null)}>
            <Icon icon="gridicons:cross" color="#DC2626" width={22} />
          </button>
        </div>
        <form className="flex flex-col gap-y-4 mt-6" autoComplete="of" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} label="اولویت:">
                <Tooltip text="پایین">
                  <ShapeRadio value="low" color={PriorityColors.low} width={40} />
                </Tooltip>
                <Tooltip text="متوسط">
                  <ShapeRadio value="medium" color={PriorityColors.medium} width={40} />
                </Tooltip>
                <Tooltip text="بالا">
                  <ShapeRadio value="high" color={PriorityColors.high} width={40} />
                </Tooltip>
              </RadioGroup>
            )}
          />
          <Controller
            name="title"
            control={control}
            rules={{
              required: "این فیلد الزامی است!",
            }}
            render={({ field, fieldState }) => <Controls.Input label="عنوان تکلیف" {...field} {...fieldState} />}
          />
          <Controller
            name="category"
            control={control}
            rules={{
              required: "این فیلد الزامی است!",
            }}
            render={({ field, fieldState }) => (
              <Controls.CategorySelect
                label="دسته‌بندی:"
                options={cats}
                isLoading={isLoading}
                togglePanel={toggleCategoryPanel}
                {...field}
                {...fieldState}
              />
            )}
          />
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => <Controls.CustomDatePicker label="موعد تکلیف:" {...field} />}
          />
          <Controller
            name="reminder"
            control={control}
            render={({ field }) => <Controls.Checkbox label="یادآور" {...field} />}
          />
          <Button
            type="submit"
            className={`text-white !rounded-sm text-lg font-semibold h-11 ${
              mutation.isLoading ? "bg-blue-700" : "bg-blue-500 shadow-6"
            }`}
            text={type === "add" ? "افزودن" : "ویرایش"}
            {...(mutation.isLoading && { endIcon: <PuffLoader color="white" size={30} />, disabled: true })}
            rippleColor="#e5e7eb"
          />
        </form>
        {categoryPanel && <CategoryPanel togglePanel={toggleCategoryPanel} />}
      </div>
    </Modal>
  );
}
