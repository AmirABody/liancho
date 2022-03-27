import { Icon } from "@iconify/react";
import Modal from "./Modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Controls from "./controls/Controls";
import { useToggle } from "react-use";
import IconButton from "./buttons/IconButton";
import Button from "./buttons/Button";
import LinkButton from "./buttons/LinkButton";

interface SignInModalProps {
  setModal: (modal: string) => void;
}

interface FieldValuesType {
  email: string;
  password: string;
  remindMe: boolean;
}

export default function SignInModal({ setModal }: SignInModalProps) {
  const [passwordVisible, togglePasswordVisible] = useToggle(false);

  const { control, handleSubmit } = useForm<FieldValuesType>({
    defaultValues: {
      email: "",
      password: "",
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
          <h1 className="text-[1.3rem] font-semibold text-gray-800 dark:text-white">ورود</h1>
          <button onClick={() => setModal("")}>
            <Icon icon="gridicons:cross" color="#DC2626" width={22} />
          </button>
        </div>
        <form className="flex flex-col gap-y-4 mt-6" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "این فیلد الزامی است!",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "ایمیل وارد شده معتبر نمی‌باشد!",
              },
            }}
            render={({ field, fieldState }) => <Controls.Input label="ایمیل" type="email" {...field} {...fieldState} />}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: "این فیلد الزامی است!" }}
            render={({ field, fieldState }) => (
              <Controls.Input
                label="رمز عبور"
                type={passwordVisible ? "text" : "password"}
                icon={
                  <IconButton
                    className="focus:bg-gray-100/20"
                    icon={
                      <Icon
                        icon={`gridicons:${passwordVisible ? "not-visible" : "visible"}`}
                        color="white"
                        width="21"
                      />
                    }
                    rippleColor="white"
                    onClick={(e) => togglePasswordVisible()}
                  />
                }
                {...field}
                {...fieldState}
              />
            )}
          />
          {/*<Controls.Checkbox
            name="remindMe"
            label="مرا به خاطر بسپار"
            value={values.remindMe}
            onToggleCheck={() => setValues((prevVal) => ({ ...prevVal, remindMe: !prevVal.remindMe }))}
          /> */}
          <div className="flex flex-col gap-y-4">
            <LinkButton text="ثبت نام نکردم!" onClick={() => setModal("signup")} />
            <LinkButton text="رمز عبورم رو فراموش کردم." onClick={() => {}} />
            <Button
              type="submit"
              className="bg-blue-500 text-white rounded-sm text-lg font-semibold h-11 shadow-6"
              text="ورود"
              rippleColor="#e5e7eb"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
