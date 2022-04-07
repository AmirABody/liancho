import React from "react";
import chroma from "chroma-js";
import Select, { ActionMeta, MultiValue, SingleValue, StylesConfig } from "react-select";
import { Category } from "../../interfaces";
import { FieldError } from "react-hook-form";
import { Icon } from "@iconify/react";
import Tooltip from "../Tooltip";
import CategoryPanel from "../dashboard/CategoryPanel";

interface SelectProps {
  name: string;
  label: string;
  value: Category;
  options: Category[];
  togglePanel: (state?: boolean) => void;
  error?: FieldError | null;
  onChange: (option: SingleValue<Category> | MultiValue<Category>, actionMeta: ActionMeta<Category>) => void;
}

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",
  columnGap: 10,

  ":before": {
    backgroundColor: color,
    borderRadius: "50%",
    content: '" "',
    display: "block",
    height: 16,
    width: 16,
  },
});

const customStyles: StylesConfig<Category> = {
  container: (styles) => ({
    ...styles,
    width: "100%",
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: 1000,
  }),
  control: (styles, { hasValue, isFocused }) => ({
    ...styles,
    paddingTop: 5,
    paddingBottom: 5,
    border: "none",
    backgroundColor: isFocused ? "rgb(59 130 246)" : hasValue ? "rgb(96 165 250)" : "rgb(156 163 175 / 0.7)",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      paddingTop: 4,
      paddingBottom: 4,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? color.alpha(0.25).css()
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled ? "#ccc" : data.color,
      ...dot(data.color),
    };
  },
  placeholder: (styles) => ({
    ...styles,
    color: "white",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "white",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "white",
  }),
  singleValue: (styles) => ({ ...styles, color: "white", ...dot("white") }),
};

export default React.forwardRef<any, SelectProps>(function CategorySelect(
  { name, label, value, options, error = null, onChange, togglePanel },
  ref
) {
  return (
    <>
      <div className="flex items-center gap-x-3">
        <label className="text-gray-500 dark:text-gray-100 text-lg font-medium">{label}</label>
        <div className="flex-grow">
          <div className="flex items-center gap-x-3">
            <Select
              name={name}
              value={value}
              placeholder="انتخاب کنید"
              getOptionValue={({ id }) => id}
              getOptionLabel={({ title }) => title}
              onChange={onChange}
              styles={customStyles}
              options={options}
            />
            <Tooltip text="افزودن دسته جدید">
              <button
                type="button"
                className="flex items-center justify-center rounded-md w-8 h-8 border-2 border-green-500 text-green-500 dark:border-none dark:bg-green-500 dark:text-white"
                onClick={() => togglePanel(true)}
              >
                <Icon icon="akar-icons:plus" width="25" />
              </button>
            </Tooltip>
          </div>
          {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
        </div>
      </div>
    </>
  );
});
