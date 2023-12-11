import { useEffect } from "react";
import { DefaultCheckbox } from "../../../../components/common/Checkbox/DefaultCheckbox";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import styles from "./index.module.scss";

interface IFilterProps {
    callback: ( e:any ,filterId:number ,valueId: number) => void;
  }
export const FiltersComponents:React.FC<IFilterProps>=({
    callback,
})=>{

  const {list} = useTypedSelector(store => store.filterNames)

  useEffect(()=>{
  },[list]);

  const listFilters = list.map((filter) => {
        if (filter.filterValues.length > 0) {
          return (
            <div key={filter.id} >
              <span style={{fontSize:"18px", fontWeight:"bold"}}>{filter.name}</span>
              <div className=" d-flex row g-1">
                {filter.filterValues?.map((value) => {
                  return (
                    <div
                      key={value.name + `_` + value.id}
                      className="d-flex g-2"
                    >
                      <DefaultCheckbox
                        id={`filter_checkbox_${value.id}`}
                        name={`filter_checkbox_${value.id}`}
                        onChange={(e: any) => {
                          callback(e,filter.id, value.id);
                        }}
                        checked={value.checked? true : false}
                        labelClassName={styles.checkbox_filter_label}
                        className={`${styles.checkbox_size}`}
                      >
                        {value.name}
                      </DefaultCheckbox>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        } else {
          return;
        }
      });
    
      return (

          <div className="d-flex row-cols-4 flex-wrap ">{listFilters}</div>

      );
} 