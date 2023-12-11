import * as Yup from "yup";

export const categoryCreateSchema = Yup.object().shape({
    name: Yup.string().min(3).required("*Обов'язкове поле"),
    image: Yup.string().min(1, "*Обов'язкове поле").required("*Обов'язкове поле"),
  });