import { useAppDispatch, useAppSelector } from "./store-hooks";
import { Notification } from "@/types";
import {
  selectNotification,
  openNotification,
  closeNotification,
} from "@/store";

export const useNotificationSlice = () => {
  const dispatch = useAppDispatch();

  /* redux notification state properties */
  const notification: Notification | null = useAppSelector(selectNotification);

  /* redux notification state updaters */
  const openNotificationState = (
    newNotification: Exclude<Notification, null>
  ) => {
    dispatch(openNotification(newNotification));
  };

  const closeNotificationState = () => {
    dispatch(closeNotification());
  };

  return {
    notification: notification,
    openNotification: openNotificationState,
    closeNotification: closeNotificationState,
  };
};
