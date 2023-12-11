import { ReactComponent as Location_Icon } from "../../../../assets/icons/location_on.svg";
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useProductAutoComplete } from "../../../../hooks/useProductAutoComplete";
import styles from "./index.module.scss";
import classNames from "classnames";
import { IProductAutoComplete } from "../../../../store/productSearch/types";

interface AutoCompleteProductProps extends InputHTMLAttributes<HTMLInputElement> {
  setSearchAutoComplete: (product: IProductAutoComplete) => void;
}

export const AutoCompleteProduct: React.FC<AutoCompleteProductProps> = ({
  setSearchAutoComplete,
  ...props
}) => {
  const [isProductAutoCompleteOpen, setIsProductAutoCompleteOpen] =
    useState<boolean>(false);
  const [productValue, setProductValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(productValue, 500);
  const { setValue, searchResult } = useProductAutoComplete();

  useEffect(() => {
    setValue(productValue);
  }, [debouncedValue]);

  // change product string
  const productInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setProductValue(e.target.value);
    setIsProductAutoCompleteOpen(true);
  };

  const productAutoCompleteHandler = (item: IProductAutoComplete) => {
    setIsProductAutoCompleteOpen(false);
    setProductValue(item.name);
    setSearchAutoComplete(item);
  };

  return (
    <div className="dropdown">
      <input
        {...props}
        id="product_auto_complete_dropdown"
        name="product_auto_complete"
        placeholder="Продукт"
        autoComplete="off"
        type="text"
        onChange={productInputHandler}
        value={productValue}
      />

      {/* Product Pop Up  */}
      <nav
        className={classNames(
          { show: isProductAutoCompleteOpen },
          { disabled: !isProductAutoCompleteOpen },
          styles.pop_up_dropdown,
          "dropdown-menu"
        )}
        aria-labelledby="product_auto_complete_dropdown"
      >
        <div className="d-flex flex-column gap-2">
          <div className={styles.autocomplete_results}>
            {searchResult.map((el :any) => (
              <button
                type="button"
                key={el.id}
                className={styles.autocomplete_results_button}
                onClick={() => productAutoCompleteHandler(el)}
              >
                <span className={styles.autocomplete_results_button_icon}>
                  <Location_Icon />
                </span>
                <div className={styles.autocomplete_results_button_info}>
                  <span className={styles.autocomplete_results_button_info_title}>
                    {el.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};