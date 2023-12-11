import classNames from "classnames";
import { IFilterNameVM } from "../../../store/filters/filterName/types";
import { DefaultCheckbox } from "../Checkbox/DefaultCheckbox";
import { ReactComponent as ArrowDropDown_Icon } from "../../../assets/icons/arrow_drop_down.svg";
import styles from "./index.module.scss";
import { useState } from "react";

interface IFilterProps {
  filters: Array<IFilterNameVM>;
  checkedFilters: Array<number>;
  callback: (id: number, value: string, checked: boolean) => void;
}
const FilterListCommon: React.FC<IFilterProps> = ({
  filters = [],
  checkedFilters,
  callback,
}) => {
  const [openCollaspes, setOpenCollaspes] = useState<number[]>([]);

  const parsedValues = checkedFilters.map((v) => Number(v));

  const handleClickcOpenColapse = (id: number) => {
    openCollaspes.includes(id)
      ? setOpenCollaspes(openCollaspes.filter((e) => e != id))
      : setOpenCollaspes([...openCollaspes, id]);
  };

  const list = filters.map((filter) => {
    if (filter.filterValues.length > 0) {
      return (
        <div key={filter.id}>
          <span className={`${styles.title}`}>{filter.name}</span>
          <div className=" d-flex row g-1">
            {filter.filterValues?.slice(0, 6).map((value) => {
              return (
                <div
                  key={value.name + `_` + value.id}
                  className="d-flex justify-content-between g-2"
                >
                  <DefaultCheckbox
                    id={`filter_checkbox_${value.id}`}
                    name={`filter_checkbox_${value.id}`}
                    className={styles.filter_checkbox}
                    labelClassName={styles.label}
                    onClick={(e: any) => {
                      callback(value.id, value.name, e.target.checked);
                    }}
                    defaultChecked={parsedValues.includes(value.id)}
                  >
                    {value.name}
                  </DefaultCheckbox>
                </div>
              );
            })}

            {/* You selected section collapse */}
            {filter.filterValues.length > 6 && (
              <>
                <div className={`collapse`} id={`filtersCollapse_${filter.id}`}>
                  <div className="d-flex row g-1 ">
                    {filter.filterValues?.slice(6).map((value) => {
                      return (
                        <div
                          key={value.name + `_` + value.id}
                          className="d-flex justify-content-between g-2"
                        >
                          <DefaultCheckbox
                            id={`filter_checkbox_${value.id}`}
                            name={`filter_checkbox_${value.id}`}
                            className={styles.filter_checkbox}
                            labelClassName={styles.label}
                            onClick={(e: any) => {
                              callback(value.id, value.name, e.target.checked);
                            }}
                            defaultChecked={parsedValues.includes(value.id)}
                          >
                            {value.name}
                          </DefaultCheckbox>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button
                  className={`d-flex align-items-center ${styles.filter_colapse_btn}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#filtersCollapse_${filter.id}`}
                  aria-controls={`filtersCollapse_${filter.id}`}
                  aria-expanded="false"
                  onClick={() => {
                    handleClickcOpenColapse(filter.id);
                  }}
                >
                  <span>Show all {filter.filterValues.length} </span>

                  <ArrowDropDown_Icon
                    className={`${styles.icon} ${
                      openCollaspes.includes(filter.id) ? styles.revers_icon : ""
                    }`}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      );
    } else {
      return;
    }
  });

  return (
    <div className={classNames(`${styles.filter_container}`)}>
      <div className={classNames(`${styles.title} ${styles.top_title}`)}>
        {`Filter by:`}
      </div>
      <div>{list}</div>
    </div>
  );
};

export default FilterListCommon;
