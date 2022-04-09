import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { useTheme } from "../../contexts/ThemeContext";

interface CustomDatePickerProps {
  value: Date;
  label: string;
  onChange: (date: Date) => void;
}

const weekDays = ["ش", "۱ش", "۲ش", "۳ش", "۴ش", "۵ش", "ج"];

export default React.forwardRef<HTMLElement, CustomDatePickerProps>(function CustomDatePicker(
  { value, label, onChange },
  ref
) {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-x-3">
      <label className="text-gray-500 dark:text-gray-100 text-lg font-medium">{label}</label>
      <div className="flex-grow">
        <DatePicker
          containerStyle={{ display: "block" }}
          className={`rmdp-mobile ${theme === 'dark' ? 'bg-dark' : ''}`}
          inputClass="custom-datepicker-input"
          value={value}
          onChange={(date: DateObject) => onChange(new Date(date.toUnix() * 1000))}
          calendar={persian}
          minDate={new Date()}
          format="dddd DD MMMM"
          weekDays={weekDays}
          arrow={false}
          mapDays={({ date }) => {
            let props = { className: "" };
            let isAfterToday = date.toUnix() * 1000 > Date.now();
            let isWeekend = [6].includes(date.weekDay.index);

            if (isWeekend && isAfterToday) props.className = "highlight highlight-red";

            return props;
          }}
          locale={persian_fa}
          calendarPosition="bottom-right"
        />
      </div>
    </div>
  );
});
