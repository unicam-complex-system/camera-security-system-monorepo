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
    title: "Entity",
    dataIndex: "entity",
    render: (_, record) => (
      <span className={`${record.entity ? "text-success" : "text-danger"}`}>
        {record.entity ? record.entity.name : "Unkown"}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button toolTipText="View screenshot" icon={<CameraOutlined />} />
        <Button
          toolTipText={"View video playback"}
          icon={<VideoCameraOutlined />}
        />
      </Space>
    ),
  },
];

export const recentActivitiesData: Activity[] = [
  {
    id: "fad4sl3jf21oia32232sj",
    timestamp: Date().toString().substring(0, 21),
    entity: authorizedEntitiesData[0],
    camera: cameras[1],
  },
  {
    id: "fad4sl3jf21oia322tesj",
    timestamp: Date().toString().substring(0, 21),
    entity: authorizedEntitiesData[2],
    camera: cameras[4],
  },
  {
    id: "fad4sl3jflfoia32232sj",
    timestamp: Date().toString().substring(0, 21),
    entity: authorizedEntitiesData[4],
    camera: cameras[3],
  },
  {
    id: "fad4sl3jf21oia72232sj",
    timestamp: Date().toString().substring(0, 21),
    camera: cameras[0],
  },
];
