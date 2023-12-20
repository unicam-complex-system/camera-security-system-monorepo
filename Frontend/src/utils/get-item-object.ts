import { AnyObject } from "@/types";

/** This is a utility function that returns an object
 *  from array of objects "data" that contain "value" on "key" property if found
 * otherwise it returns undefined.
 * */
export const getItemObject = <T>(
  value: string | number,
  key: keyof T,
  data: T[]
) => {
  return data.filter((item) => item[key] === value);
};
