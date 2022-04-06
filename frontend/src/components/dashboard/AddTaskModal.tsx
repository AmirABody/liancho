import { Icon } from "@iconify/react";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Task, PriorityColors } from "../../interfaces";
import Controls from "../controls/Controls";
import ShapeRadio from "../controls/ShapeRadio";
import RadioGroup from "../controls/RadioGroup";
import Modal from "../Modal";
import Tooltip from "../Tooltip";
import Button from "../buttons/Button";

interface AddTaskModalProps {
  setModal: (modal: string) => void;
}

type FieldValuesType = Exclude<Task, "time">;

export default function AddTaskModal({ setModal }: AddTaskModalProps) {
  const { control, handleSubmit } = useForm<FieldValuesType>({
    defaultValues: {
      priority: "medium",
      title: "",
      category: { color: "", title: "" },
      dueDate: new Date(),
      reminder: false,
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FieldValuesType> = (values) => {
    console.log(values);
  };

  return (
    <Modal setModal={setModal}>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-[1.3rem] font-semibold text-gray-800 dark:text-white">افزودن تکلیف</h1>
          <button onClick={() => setModal("")}>
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
                  <ShapeRadio value="low" color={PriorityColors.low} />
                </Tooltip>
                <Tooltip text="متوسط">
                  <ShapeRadio value="medium" color={PriorityColors.medium} />
                </Tooltip>
                <Tooltip text="بالا">
                  <ShapeRadio value="high" color={PriorityColors.high} />
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
            className="text-white !rounded-sm text-lg font-semibold h-11 bg-blue-500 shadow-6"
            text="افزودن"
            rippleColor="#e5e7eb"
          />
        </form>
      </div>
    </Modal>
  );
}
