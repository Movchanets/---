import * as Yup from "yup";

export const filterGroupSchema = Yup.object().shape({
    FilterNameId: Yup.number().required("*Обов'язкове поле")

  });
