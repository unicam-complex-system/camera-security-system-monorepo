/** This is a data type that denotes an activity (event) that took place at a certain time.
 * Activity is composed of properties such as id, timestamp, camera,entity etc.
 * */
export type Activity = {
  _id: string;
  timestamp: string;
  cameraId: string;
  cameraName?: string;
};
