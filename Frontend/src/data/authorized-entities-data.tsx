"use client";
import { AuthorizedEntity } from "@/types";
import { Button } from "@/components";
import { Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Image from "next/image";

import type { ColumnsType } from "antd/es/table";

export const authorizedEntitiesColumns: ColumnsType<AuthorizedEntity> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "entityType",
    key: "entityType",
  },
  {
    title: "Registration Date",
    dataIndex: "registrationDate",
    key: "registrationDate",
  },
  {
    title: "Photo",
    dataIndex: "photoUrl",
    key: "photoUrl",
    render: (_, record) => (
      <Image src={record.photoUrl} alt={record.name} width={70} height={70} />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          toolTipText="Edit entity details"
          variant={"warning"}
          icon={<EditOutlined />}
        />
        <Button
          variant={"danger"}
          toolTipText={"Remove entity"}
          icon={<DeleteOutlined />}
        />
      </Space>
    ),
  },
];

export const authorizedEntitiesData: AuthorizedEntity[] = [
  {
    id: "fad4sl3jf21oia32232sj",
    name: "Nabil Mohammed",
    entityType: "human",
    registrationDate: Date().toString().substring(0, 15),
    photoUrl: "/images/person.jpg",
  },
  {
    id: "fad4sl3jf21oivc4sj",
    name: "Leonardo Migliorelli",
    entityType: "human",
    registrationDate: Date().toString().substring(0, 15),
    photoUrl: "/images/person.jpg",
  },
  {
    id: "fad4sl3dfw1oia32232sj",
    name: "Nicolo Rossini",
    entityType: "human",
    registrationDate: Date().toString().substring(0, 15),
    photoUrl: "/images/person.jpg",
  },
  {
    id: "fad4sl3jf21de32ssj",
    name: "Tom",
    entityType: "animal",
    registrationDate: Date().toString().substring(0, 15),
    photoUrl: "/images/cat.jpeg",
  },

  {
    id: "fad4sl3j4d2dssj",
    name: "Bob",
    entityType: "animal",
    registrationDate: Date().toString().substring(0, 15),
    photoUrl: "/images/dog.jpeg",
  },
];
