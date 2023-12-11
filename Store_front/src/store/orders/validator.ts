import * as Yup from "yup";

export const orderCreateSchema = Yup.object().shape({
  // userId: Yup.number().typeError("Id користувача має бути цифрою")
  //   .required("*Required field")
  //   .min(1, "Id користувача має бути більше 0"),
  accommodationTypeId: Yup.number()
    .typeError("Id помешкання має бути цифрою")
    .required("*Required field")
    .min(1, "Id помешкання має бути більше 0"),
  email: Yup.string()
    .required("*Required field")
    .email("Invalid email address"),
  firstName: Yup.string().required("*Required field"),
  lastName: Yup.string().required("*Required field"),
  dateFrom: Yup.string().required("*Required field"),
  dateTo: Yup.string().required("*Required field"),
  adults: Yup.number()
    .typeError("Кількість дорослих має бути цифрою")
    .required("*Required field")
    .min(1, "Кількість дорослих має бути більше 0"),
  children: Yup.number()
    .typeError("Кількість дітей має бути цифрою")
    .required("*Required field"),
  comment: Yup.string().nullable(),
  isTravelingForWork: Yup.boolean().default(false),
  isNotStayer: Yup.boolean().default(false),
  isConfirmed: Yup.boolean().default(false),
  isPaid: Yup.boolean().default(false),
  isCanceled: Yup.boolean().default(false),
  isFinished: Yup.boolean().default(false),
});

export const orderEditSchema = Yup.object().shape({
  // userId: Yup.number()
  //   .typeError("Id користувача має бути цифрою")
  //   .required("*Required field")
  //   .min(1, "Id користувача має бути більше 0"),
  accommodationTypeId: Yup.number()
    .typeError("Id помешкання має бути цифрою")
    .required("*Required field")
    .min(1, "Id помешкання має бути більше 0"),
  email: Yup.string()
    .required("*Required field")
    .email("Invalid email address"),
  firstName: Yup.string().required("*Required field"),
  lastName: Yup.string().required("*Required field"),
  dateFrom: Yup.string().required("*Required field"),
  dateTo: Yup.string().required("*Required field"),
  adults: Yup.number()
    .typeError("Кількість дорослих має бути цифрою")
    .required("*Required field")
    .min(1, "Кількість дорослих має бути більше 0"),
  children: Yup.number()
    .typeError("Кількість дітей має бути цифрою")
    .required("*Required field"),
  comment: Yup.string().nullable(),
  isTravelingForWork: Yup.boolean().default(false),
  isNotStayer: Yup.boolean().default(false),
  isConfirmed: Yup.boolean().default(false),
  isPaid: Yup.boolean().default(false),
  isCanceled: Yup.boolean().default(false),
  isFinished: Yup.boolean().default(false),
});
