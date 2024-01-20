import * as yup from "yup";

export const loginFormSchema = yup
  .object({
    name: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
  })
  .required();
