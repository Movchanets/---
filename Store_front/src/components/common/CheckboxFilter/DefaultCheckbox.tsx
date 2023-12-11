import React, { InputHTMLAttributes } from "react";
import styles from "./index.module.scss";

interface IDefaultCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  labelClassName?: string;
  children?: string;
}

export const FilterCheckbox: React.FC<IDefaultCheckboxProps> = ({
  children,
  wrapperClassName,
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
