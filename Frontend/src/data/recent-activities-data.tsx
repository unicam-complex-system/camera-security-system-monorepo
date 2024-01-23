"use client";
import { Activity } from "@/types";
import { Button } from "@/components";
import { Space } from "antd";
import { CameraOutlined, VideoCameraOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { cameras } from "./camera-data";
import { authorizedEntitiesData } from "./authorized-entities-data";

export const recentActivitiesColumns: ColumnsType<Activity> = [
  {
    title: "Time",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "Camera",
    dataIndex: "camera",
    render: (_, record) => <span>{record.camera.name}</span>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button toolTipText="View screenshot" icon={<CameraOutlined />} />
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
    id: "fad4sl3jf21oia32232sj",
    timestamp: Date().toString().substring(0, 21),
    cameraId: cameras[1].key,
  },
  {
    id: "fad4sl3jf21oia322tesj",
    timestamp: Date().toString().substring(0, 21),
    cameraId: cameras[4].key,
  },
  {
    id: "fad4sl3jflfoia32232sj",
    timestamp: Date().toString().substring(0, 21),
    cameraId: cameras[3].key,
  },
  {
    id: "fad4sl3jf21oia72232sj",
    timestamp: Date().toString().substring(0, 21),
    cameraId: cameras[0].key,
  },
];
