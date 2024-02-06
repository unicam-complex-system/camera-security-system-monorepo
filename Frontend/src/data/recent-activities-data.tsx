"use client";
import { Activity } from "@/types";
import { ViewScreenshotButton } from "@/components";
import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { cameras } from "./camera-data";

export const recentActivitiesColumns: ColumnsType<Activity> = [
  {
    title: "Time",
    dataIndex: "timestamp",
    render: (_, record) => <span>{new Date(record.timestamp).toString().substring(0, 21)}</span>,

  },
  {
    title: "Camera",
    dataIndex: "cameraName",
    render: (_, record) => <span>{record.cameraName}</span>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <ViewScreenshotButton
          cameraId={record.cameraId}
          timestamp={record.timestamp.replaceAll(" ", "")}
        />
        {/* <Button
          toolTipText={"View video playback"}
          icon={<VideoCameraOutlined />}
        /> */}
      </Space>
    ),
  },
];

export const recentActivitiesData: Activity[] = [
  {
    _id: "fad4sl3jf21oia32232sj",
    timestamp: Date().toString().substring(0, 21),
    cameraId: cameras[1].id,
  },
  {
    _id: "fad4sl3jf21oia322tesj",
    timestamp: Date().toString().substring(0, 21),
    cameraId: cameras[4].id,
  },
  {
    _id: "fad4sl3jflfoia32232sj",
    timestamp: Date().toString().substring(0, 21),
    cameraId: cameras[3].id,
  },
  {
    _id: "fad4sl3jf21oia72232sj",
    timestamp: Date().toString().substring(0, 21),
    cameraId: cameras[0].id,
  },
];
