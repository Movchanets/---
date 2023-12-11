import * as Yup from "yup";

export const productCreateSchema = Yup.object().shape({
  name: Yup.string()
    .required("*Required field")
    .min(3, "Name must have more than 3 characters"),
  description: Yup.string().required("*Required field"),
  shortDescription: Yup.string()
    .max(
      350,
      "Character limit: 350 characters exceeded. Please shorten your вescription"
    )
    .required("*Required field"),
  price: Yup.number().min(1, "Price must be greater than 0"),
  quantity: Yup.number().min(1, "Quantity must be greater than 0"),
  categoryId: Yup.number()
    .typeError("Category id must be a number")
    .required("*Required field")
    .min(1, "Category id must be greater than 0"),
  images: Yup.array().min(1, "*Required field"),

  
});

export const productEditSchema = Yup.object().shape({
  name: Yup.string()
    .required("*Required field")
    .min(3, "Name must have more than 3 characters"),
  description: Yup.string().required("*Required field"),
  shortDescription: Yup.string()
    .max(
      350,
      "Character limit: 350 characters exceeded. Please shorten your вescription"
    )
    .required("*Required field"),
    price: Yup.number().min(1, "Price must be greater than 0"),
  quantity: Yup.number().min(1, "Quantity must be greater than 0"),
  categoryId: Yup.number()
    .typeError("Category id must be a number")
    .required("*Required field")
    .min(1, "Category id must be greater than 0"),

  
});

export const productByUserCreateSchema = Yup.object().shape({
  //product shema
  product: productCreateSchema,
  
});
