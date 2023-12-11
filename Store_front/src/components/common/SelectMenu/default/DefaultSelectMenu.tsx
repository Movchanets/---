import classNames from "classnames";
import React, { ButtonHTMLAttributes, useEffect, useId, useState } from "react";
import styles from "./index.module.scss";

interface DefaultSelectMenuProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  currentValue?: string;
  selectable?: Array<string>;
  textBeforeSelect?: string;
  onSelectValue?: (value: string) => void;
}

export const DefaultSelectMenu: React.FC<DefaultSelectMenuProps> = ({
  currentValue,
  selectable,
  textBeforeSelect = "",
  onSelectValue,
  ...props
}) => {
  const dropdownId = useId();
  const [_currentValue, setCurrentValue] = useState<string>("");

  useEffect(() => {
    setCurrentValue(currentValue ?? (selectable ? selectable[0] : ""));
  }, [currentValue]);

  const onSelectHandle = (value: string) => {
    if (onSelectValue) onSelectValue(value);
    setCurrentValue(value);
  };

  return (
    <>
      <div className="dropdown">
        <button
          {...props}
          className={classNames(
            `dropdown-toggle ${styles.dropdown_button} ${props.className}`
          )}
          id={`default_dropdown_${dropdownId}`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          type="button"
        >
          {`${textBeforeSelect}${_currentValue}`}
        </button>

        <ul
          className={`${styles.dropdown_menu} dropdown-menu`}
          aria-labelledby={`default_dropdown_${dropdownId}`}
        >
          {selectable &&
            selectable.map((value, index) => (
              <li key={index}>
                <button
                  className="dropdown-item"
                  onClick={() => onSelectHandle(value)}
                >
                  {value}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
