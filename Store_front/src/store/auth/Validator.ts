import * as Yup from "yup";

// export const passwordRegExp =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;

export const DefaultAuthValidatorSchema = Yup.object().shape({
  email: Yup.string().required("*Required field").email("Invalid email address"),
});

export const LoginAuthValidatorSchema = Yup.object().shape({
  password: Yup.string().required("*Required field"),
});

export const RegisterAuthValidatorSchema = Yup.object().shape({
  password: Yup.string()
    .required("*Required field")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/\d+/, "One number"),

  confirmPassword: Yup.string()
    .required("*Required field")
    .oneOf([Yup.ref("password")], "Passwords don't match"),
});

export const ForgetPasswordValidatorSchema = Yup.object().shape({
  email: Yup.string().required("*Required field").email("Invalid email address"),
});

export const ResetPasswordValidatorSchema = Yup.object().shape({
  email: Yup.string().required("*Required field").email("Invalid email address"),

  token: Yup.string().required("*Required field"),

  password: Yup.string()
    .required("*Required field")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/\d+/, "One number"),

  confirmPassword: Yup.string()
    .required("*Required field")
    .oneOf([Yup.ref("password")], "Passwords don't match"),
});

export const EditUserValidatorSchema = Yup.object().shape({
  name: Yup.string().required("*Required field"),
  surname: Yup.string().required("*Required field"),
  email: Yup.string().required("*Required field").email("Invalid email address"),
});
