import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { PuffLoader } from "react-spinners";
import { Category, CategoryColors } from "../../interfaces";
import { setCat } from "../../pages/cat-api/api";
import { useCats } from "../../pages/cat-api/hooks-api";
import Button from "../buttons/Button";
import Controls from "../controls/Controls";
import RadioGroup from "../controls/RadioGroup";
import ShapeRadio from "../controls/ShapeRadio";
import { toast } from "../CustomToast";
import Modal from "../Modal";

interface CategoryPanelProps {
  togglePanel: (state?: boolean) => void;
}

type FieldValuesType = Exclude<Category, "id">;

export default function CategoryPanel({ togglePanel }: CategoryPanelProps) {
  const queryClient = useQueryClient();

  const { cats } = useCats();

  const mutation = useMutation((cat: Category) => setCat(cat), {
    onError: (error, variables, context) => {
      let message = (error as any).response.data.message.fr;
      toast({ type: "error", message });
    },
    onSuccess: (data, variables, context) => {
      toast({ type: "success", message: "دسته بندی با موفقیت ساخته شد!" });
      queryClient.invalidateQueries("cats");
      togglePanel(false);
    },
  });

  const { control, handleSubmit } = useForm<FieldValuesType>({
    defaultValues: {
      color: undefined,
      title: "",
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FieldValuesType> = (values) => {
    mutation.mutate(values);
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
          rules={{ required: "این فیلد الزامی است!" }}
          render={({ field, fieldState }) => (
            <RadioGroup {...field} {...fieldState} label="رنگ دسته:">
              {Object.values(CategoryColors).map((color: string) => {
                const isUsed = cats.some((cat: Category) => cat.color === color);
                return <ShapeRadio key={color} value={color} color={color} width={28} disabled={isUsed} />;
              })}
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
            className={`flex-grow text-white !rounded-sm text-lg font-semibold h-11 ${
              mutation.isLoading ? "bg-green-700" : "bg-green-500 shadow-5"
            }`}
            text="افزودن دسته"
            {...(mutation.isLoading && { endIcon: <PuffLoader color="white" size={30} />, disabled: true })}
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
