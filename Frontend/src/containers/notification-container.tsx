import { useNotificationSlice } from "@/hooks";
import { notification as antNotification } from "antd";
import { useEffect } from "react";

export const NotificationContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contextHolder] = antNotification.useNotification();

  const { notification } = useNotificationSlice();

  /* useEffect */
  useEffect(() => {
    if (notification) {
      api[notification.type]({
        message: notification.type.toUpperCase(),
        description: notification.message,
        placement: "bottomRight",
      });
    }
  }, [notification]);

  return (
    <>
      {notification && <>{contextHolder}</>}
      {children}
    </>
  );
};
