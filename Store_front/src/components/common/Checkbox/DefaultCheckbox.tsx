import React, { InputHTMLAttributes } from "react";
import styles from "./index.module.scss";

interface IDefaultCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  children?: string;
}

export const DefaultCheckbox: React.FC<IDefaultCheckboxProps> = ({
  children,
  wrapperClassName,
  inputClassName,
  labelClassName,
  ...props
}) => {
  return (
    <>
      <div className={`${styles.checkbox_wrapper} ${wrapperClassName}`}>
        <input {...props} type="checkbox" />
        <label className={labelClassName} htmlFor={props.id}>
          {children}
        </label>
      </div>
    </>
  );
};
