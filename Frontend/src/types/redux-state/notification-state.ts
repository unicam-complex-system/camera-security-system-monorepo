import { Notification } from "../models/notification";

/** This is a data type that denotes a data type of the Notification redux slice.
 * */
export type NotificationState = {
  currentNotification: Notification | null;
};
