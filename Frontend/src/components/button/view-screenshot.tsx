import { Button } from "./button";
import { CameraOutlined } from "@ant-design/icons";
import { useModalSlice, useNotificationSlice } from "@/hooks";
import { useQuery } from "react-query";
import { getActivityImage } from "@/api";
import { Spin } from "antd";
import { useEffect } from "react";

type PropsType = {
  cameraId: string;
  timestamp: string;
};

/**  This component renders screenshot button */
export const ViewScreenshotButton: React.FC<PropsType> = ({
  cameraId,
  timestamp,
}) => {
  const { openModal, closeModal } = useModalSlice();
  const { openNotification } = useNotificationSlice();

  // Get total number of recent activities
  const {
    isLoading: isLoadingImage,
    error: isErrorImage,
    data: imageData,
    refetch: fetchImage,
  } = useQuery(
    ["recentActivitiesCount", cameraId],
    getActivityImage(cameraId, timestamp),
    { enabled: false }
  );

  const onButtonClick = () => {
    fetchImage();
  };

  useEffect(() => {
    if (imageData) {
      openModal({
        title: timestamp,
        modalContent: imageData.data,
        isLoading: true,
      });
    }
  }, [imageData]);

  useEffect(() => {
    if (isLoadingImage) {
      openModal({
        title: timestamp,
        modalContent: "",
        isLoading: true,
      });
    }
  }, [isLoadingImage]);

  useEffect(() => {
    if (isErrorImage) {
      openNotification({
        type: "error",
        message: "Could not fetch image.",
      });
      closeModal();
    }
  }, [isErrorImage]);

  return (
    <Button
      toolTipText="View screenshot"
      icon={<CameraOutlined />}
      onClick={onButtonClick}
    />
  );
};
