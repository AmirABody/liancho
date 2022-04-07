import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Category, CategoryColors } from "../../interfaces";
import Button from "../buttons/Button";
import Controls from "../controls/Controls";
import RadioGroup from "../controls/RadioGroup";
import ShapeRadio from "../controls/ShapeRadio";
import Modal from "../Modal";

interface CategoryPanelProps {
  togglePanel: (state?: boolean) => void;
}

type FieldValuesType = Exclude<Category, "id">;

export default function CategoryPanel({ togglePanel }: CategoryPanelProps) {
  const { control, handleSubmit } = useForm<FieldValuesType>({
    defaultValues: {
      color: CategoryColors.AMBER_500,
      title: "",
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FieldValuesType> = (values) => {
    console.log(values);
  };

  return (
    <Modal
      setModal={() => {
        togglePanel(false);
      }}
      center={true}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} label="رنگ دسته:">
              {Object.values(CategoryColors).map((color: string) => (
                <ShapeRadio key={color} value={color} color={color} width={28} />
              ))}
            </RadioGroup>
          )}
        />
        <Controller
          name="title"
          control={control}
          rules={{
            required: "این فیلد الزامی است!",
          }}
          render={({ field, fieldState }) => <Controls.Input label="عنوان دسته" {...field} {...fieldState} />}
        />
        <div className="flex items-center gap-x-2">
          <Button
            type="submit"
            className="flex-grow text-white !rounded-sm text-lg font-semibold h-11 bg-green-500 shadow-5"
            text="افزودن دسته"
            rippleColor="#e5e7eb"
          />
          <Button
            type="button"
            className="flex-grow text-white !rounded-sm text-lg font-semibold h-11 bg-red-500"
            onClick={() => togglePanel(false)}
            text="خروج"
            rippleColor="#e5e7eb"
          />
        </div>
      </form>
    </Modal>
  );
}
