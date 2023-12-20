import { AnyObject } from "@/types";

/** This is a utility function that returns an array of objects by filtering
 * array of objects "data" that contain any value in "values" on "key" property.
 * */
export const getObjectArray = <T>(
  values: string[] | number[],
  key: keyof T,
  data: T[]
) => {
  let items: T[] = [];
  for (let i = 0; i < values.length; i++) {
    items = [...items, ...data.filter((item) => item[key] === values[i])];
  }
  return items;
};
