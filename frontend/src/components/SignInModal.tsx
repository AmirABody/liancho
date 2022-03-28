import { Icon } from "@iconify/react";
import Modal from "./Modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Controls from "./controls/Controls";
import { useToggle } from "react-use";
import IconButton from "./buttons/IconButton";
import Button from "./buttons/Button";
import LinkButton from "./buttons/LinkButton";
import { useMutation } from "react-query";
import { login as loginUser } from "../pages/user-api";
import { toast, ToastContainer } from "./CustomToast";
import { User } from "../interfaces";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

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

  let navigate = useNavigate();

  const mutation = useMutation((user: Pick<User, "email" | "password">) => loginUser(user), {
    onError: (error, variables, context) => {
      let message = (error as any).response.data.message.fr;
      toast({ type: "error", message });
    },
    onSuccess: (data, variables, context) => {
      toast({ type: "success", message: "ورود با موفقیت انجام شد!" });
      console.log(data);

      setTimeout(() => {
        navigate('/dashboard')
      }, 1000);
    },
  });

  const { control, handleSubmit } = useForm<FieldValuesType>({
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
    };

    mutation.mutate(userData);
  };

  return (
    <>
      <ToastContainer />
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
              render={({ field, fieldState }) => (
                <Controls.Input label="ایمیل" type="email" {...field} {...fieldState} />
              )}
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
              <div className="inline-flex flex-col">
                <LinkButton text="ثبت نام نکردم!" onClick={() => setModal("signup")} />
                <LinkButton text="رمز عبورم رو فراموش کردم." onClick={() => {}} />
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
    </>
  );
}
