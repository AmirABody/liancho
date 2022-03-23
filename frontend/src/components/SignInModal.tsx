import { Icon } from "@iconify/react";
import Modal from "./Modal";
import useForm from "./useForm";
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

const initialFValues = {
  email: "",
  password: "",
  remindMe: false,
};

export default function SignInModal({ setModal }: SignInModalProps) {
  const [passwordVisible, togglePasswordVisible] = useToggle(false);

  function validate(fieldValues: Partial<FieldValuesType> = values): boolean | void {
    let temp = { ...errors };

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
        <form className="flex flex-col gap-y-5 mt-6" autoComplete="off" onSubmit={handleSubmit}>
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
          <Controls.Checkbox
            name="remindMe"
            label="مرا به خاطر بسپار"
            value={values.remindMe}
            onToggleCheck={() => setValues((prevVal) => ({ ...prevVal, remindMe: !prevVal.remindMe }))}
          />
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
