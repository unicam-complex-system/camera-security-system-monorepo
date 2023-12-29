
/** This is a data type that denotes a notification. notification is composed of
 * properties such as type, message, etc.
 * It is null if there is no notification.
 * */
export type Notification = {
  type: "info" | "error" | "success";
  message: string;
} | null;
