import { Icon } from "@iconify/react";
import Modal from "../Modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Controls from "../controls/Controls";
import { useToggle } from "react-use";
import IconButton from "../buttons/IconButton";
import Button from "../buttons/Button";
import LinkButton from "../buttons/LinkButton";
import { useMutation } from "react-query";
import { login as loginUser, sendPasswordReset } from "../../pages/user-api/api";
import { toast } from "../CustomToast";
import { User } from "../../interfaces";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { alert } from "../ConfirmAlert";
import { useTheme } from "../../contexts/ThemeContext";

interface SignInModalProps {
  setModal: (modal: string) => void;
}

interface FieldValuesType {
  email: string;
  password: string;
  remindMe: boolean;
}

export default function SignInModal({ setModal }: SignInModalProps) {
  const { theme } = useTheme();

  const [passwordVisible, togglePasswordVisible] = useToggle(false);

  let navigate = useNavigate();

  const mutation = useMutation((user: Pick<User, "email" | "password">) => loginUser(user), {
    onError: (error, variables, context) => {
      let message = (error as any).response.data.message.fr;
      toast({ type: "error", message });
    },
    onSuccess: (data, variables, context) => {
      toast({ type: "success", message: "ورود با موفقیت انجام شد!" });

      // setTimeout(() => {
      navigate("/dashboard");
      // }, 1000);
    },
  });

  const resetPassMutation = useMutation((email: string) => sendPasswordReset(email), {
    onError: (error, variables, context) => {
      let message = (error as any).response.data.message.fr;
      toast({ type: "error", message });
    },
    onSuccess: (data, variables, context) => {
      toast({ type: "success", message: "لینک بازیابی رمز عبور به ایمیل ارسال شد." });
    },
  });

  const { control, handleSubmit, getValues, trigger } = useForm<FieldValuesType>({
    defaultValues: {
      email: "",
      password: "",
      remindMe: true,
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FieldValuesType> = (values) => {
    const userData = {
      email: values.email,
      password: values.password,
      remindMe: values.remindMe,
    };

    mutation.mutate(userData);
  };

  const handlePasswordReset = async () => {
    if (await trigger("email", { shouldFocus: true })) {
      const email = getValues("email");
      alert({ text: "آیا اطمینان دارید؟", action: () => resetPassMutation.mutateAsync(email) });
    }
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
          <Controller
            name="remindMe"
            control={control}
            render={({ field }) => <Controls.Checkbox label="مرا به خاطر بسپار" {...field} />}
          />
          <div className="flex flex-col gap-y-4 -mt-2">
            <div className="inline-flex flex-col items-end">
              <LinkButton text="ثبت نام نکردم!" onClick={() => setModal("signup")} />
              <div className="flex items-center w-fit gap-x-1">
                <LinkButton text="رمز عبورم رو فراموش کردم." onClick={handlePasswordReset} />
                {/* {resetPassMutation.isLoading && (
                  <PuffLoader color={theme === "light" ? "#374151" : "white"} size={30} />
                )} */}
              </div>
            </div>
            <Button
              type="submit"
              className={`${
                mutation.isLoading ? "bg-blue-500/30" : "bg-blue-500 shadow-6"
              } text-white !rounded-sm text-lg font-semibold h-11`}
              text="ورود"
              {...(mutation.isLoading && { endIcon: <PuffLoader color="white" size={30} />, disabled: true })}
              rippleColor="#e5e7eb"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
