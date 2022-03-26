import { Icon } from "@iconify/react";
import Modal from "./Modal";
import useForm from "./useForm";
import Controls from "./controls/Controls";
import { useToggle } from "react-use";
import IconButton from "./buttons/IconButton";
import Button from "./buttons/Button";
import React, { useEffect, useState } from "react";
import LinkButton from "./buttons/LinkButton";
import PuffLoader from "react-spinners/PuffLoader";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { register } from "../pages/user-api";
import { User } from "../interfaces";
import { toast, ToastContainer } from "./CustomToast";

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

const initialFValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  remindMe: false,
};

export default function SignUpModal({ setModal }: SignUpModalProps) {
  const [passwordVisible, togglePasswordVisible] = useToggle(false);

  const mutation = useMutation((user: User) => register(user));

  useEffect(() => {
    if (mutation.isSuccess) toast({ type: "success", message: "ثبت نام با موفقیت انجام شد!" });
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isError) toast({ type: "error", message: (mutation.error as Error).message });
  }, [mutation.isError]);

  function validate(fieldValues: Partial<FieldValuesType> = values): boolean | void {
    let temp = { ...errors };

    if (fieldValues.fullName) temp.fullName = fieldValues.fullName ? "" : "این فیلد اجباری است!";
    if (fieldValues.email) temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? "" : "ایمیل وارد شده معتبر نمی‌باشد!";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) {
      return Object.values(temp).every((x) => x === "");
    }
  }

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm<FieldValuesType>(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // console.log(values);

    if (values.password !== values.confirmPassword) {
      toast({ type: "warning", message: "رمز عبورهای وارد شده تطابق ندارند!" });
    } else {
      const userData = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      };

      mutation.mutate(userData);
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
          <form className="flex flex-col gap-y-5 mt-3" autoComplete="off" onSubmit={handleSubmit}>
            <Controls.Input
              name="fullName"
              label="نام و نام خانوادگی"
              value={values.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
            />
            <Controls.Input
              name="email"
              type="email"
              label="ایمیل"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Controls.Input
              name="password"
              type={passwordVisible ? "text" : "password"}
              label="رمز عبور"
              icon={
                <IconButton
                  icon={
                    <Icon icon={`gridicons:${passwordVisible ? "not-visible" : "visible"}`} color="white" width="21" />
                  }
                  rippleColor="white"
                  onClick={(e) => togglePasswordVisible()}
                />
              }
              value={values.password}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="confirmPassword"
              type={passwordVisible ? "text" : "password"}
              label="تکرار رمز عبور"
              value={values.confirmPassword}
              onChange={handleInputChange}
            />
            <Controls.Checkbox
              name="remindMe"
              label="مرا به خاطر بسپار"
              value={values.remindMe}
              onToggleCheck={() => setValues((prevVal) => ({ ...prevVal, remindMe: !prevVal.remindMe }))}
            />
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
