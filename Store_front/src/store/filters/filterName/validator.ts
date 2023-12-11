import * as Yup from "yup";

export const filterNameSchema = Yup.object().shape({
    name: Yup.string().min(3, "Ім'я значення повино містити не манше 3 симфолів")
  });
