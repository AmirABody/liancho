import { Icon } from "@iconify/react";
import Modal from "./Modal";
import Controls from "./controls/Controls";
import { useToggle } from "react-use";
import IconButton from "./buttons/IconButton";
import Button from "./buttons/Button";
import { useEffect } from "react";
import LinkButton from "./buttons/LinkButton";
import PuffLoader from "react-spinners/PuffLoader";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { register as registerUser } from "../pages/user-api";
import { User } from "../interfaces";
import { toast, ToastContainer } from "./CustomToast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface SignUpModalProps {
  setModal: (modal: string) => void;
}

interface FieldValuesType {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  remindMe: boolean;
}

export default function SignUpModal({ setModal }: SignUpModalProps) {
  const [passwordVisible, togglePasswordVisible] = useToggle(false);

  const mutation = useMutation((user: User) => registerUser(user));

  useEffect(() => {
    if (mutation.isSuccess) toast({ type: "success", message: "ثبت نام با موفقیت انجام شد!" });
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isError) toast({ type: "error", message: (mutation.error as Error).message });
  }, [mutation.isError]);

  const { control, handleSubmit } = useForm<FieldValuesType>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FieldValuesType> = (values) => {
    console.log(values);

    if (values.password !== values.confirmPassword) {
      toast({ type: "warning", message: "رمز عبورهای وارد شده تطابق ندارند!" });
    } else {
      const userData = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      };

      // mutation.mutate(userData);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal setModal={setModal}>
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-[1.3rem] font-semibold text-gray-800 dark:text-white">ثبت نام</h1>
            <button onClick={() => setModal("")}>
              <Icon icon="gridicons:cross" color="#DC2626" width={22} />
            </button>
          </div>
          <form className="flex flex-col gap-y-4 mt-3" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: "این فیلد الزامی است!" }}
              render={({ field, fieldState }) => (
                <Controls.Input label="نام و نام خانوادگی" {...field} {...fieldState} />
              )}
            />
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
              name="confirmPassword"
              control={control}
              rules={{ required: "این فیلد الزامی است!" }}
              render={({ field, fieldState }) => (
                <Controls.Input
                  label="تکرار رمز عبور"
                  type={passwordVisible ? "text" : "password"}
                  {...field}
                  {...fieldState}
                />
              )}
            />
            {/* <Controls.Checkbox
               name="remindMe"
               label="مرا به خاطر بسپار"
               value={values.remindMe}
               onToggleCheck={() => setValues((prevVal) => ({ ...prevVal, remindMe: !prevVal.remindMe }))}
             /> */}
            <div className="flex flex-col gap-y-4">
              <LinkButton text="ثبت نام کردم، بریم ورود کنیم:)" onClick={() => setModal("signin")} />
              <Button
                type="submit"
                className={`${
                  mutation.isLoading ? "bg-green-500/30" : "bg-green-500 shadow-5"
                } text-white !rounded-sm text-lg font-semibold h-11`}
                text="ثبت نام"
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