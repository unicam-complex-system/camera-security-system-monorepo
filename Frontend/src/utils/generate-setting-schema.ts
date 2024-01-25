import * as yup from "yup";
import { AnyObject } from "@/types";

export const generateSettingFormSchema = (cameras: string[] | number[]) => {
  const schemaObject: AnyObject = {};

  cameras.forEach((camera) => {
    schemaObject[camera] = yup.string().required("This field is required");
  });

  return yup
    .object({
      ...schemaObject,
    })
    .required();
};
