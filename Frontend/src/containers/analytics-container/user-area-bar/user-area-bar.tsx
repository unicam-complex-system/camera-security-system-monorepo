import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { Select, DatePicker } from "antd";
import type { SelectProps } from "antd";
import { Card } from "@/components";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { theme } from "../../../../theme";
import {
  BarChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cameras, authorizedEntitiesData } from "@/data";
import { getObjectArray } from "@/utils";
import type { AnyObject, AuthorizedEntity, Camera } from "@/types";

export const UserAreaBarContainer: FC = () => {
  const cameraOptions = cameras.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const entityOptions = authorizedEntitiesData.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const [timeOption, setTimeOption] = useState<"day" | "month">("day");
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [selectedEntities, setSelectedEntities] = useState<AuthorizedEntity[]>(
    []
  );
  const [selectedCameras, setSelectedCameras] = useState<Camera[]>([]);
  const [data, setData] = useState<AnyObject[]>([]);

  useEffect(() => {
    if (selectedEntities.length === 0) {
      setSelectedEntities(authorizedEntitiesData);
    }
    if (selectedCameras.length === 0) {
      setSelectedCameras(cameras);
    }
    /* First construct cameras */
    let formulatedData = selectedCameras.map((item) => ({ camera: item.name }));
    /* constuct the count of selected users */
    for (let i = 0; i < formulatedData.length; i++) {
      for (let j = 0; j < selectedEntities.length; j++) {
        formulatedData[i] = {
          ...formulatedData[i],
          [selectedEntities[j].id]: Math.floor(Math.random() * 1000),
        };
      }
    }
    /* set Data */
    setData(formulatedData);
  }, [selectedEntities, selectedCameras]);

  const handleEntitySelectChange = (value: string[]) => {
    const selectedEntitiesObject = getObjectArray(
      value,
      "id",
      authorizedEntitiesData
    );
    setSelectedEntities(selectedEntitiesObject);
  };

  const handleCameraSelectChange = (value: string[]) => {
    const selectedCamerasObject = getObjectArray(value, "id", cameras);
    setSelectedCameras(selectedCamerasObject);
  };

  const CardHeader: FC = () => {
    return (
      <div className="text-sm flex gap-x-4 justify-between items-center">
        <span>Detection of Authorized Entity per Camera Summary</span>
        <Select
          popupMatchSelectWidth={false}
          size="small"
          defaultValue={timeOption}
          onChange={setTimeOption}
          options={[
            { value: "day", label: "Day" },
            { value: "month", label: "Month" },
          ]}
        />
      </div>
    );
  };

  return (
    <>
      <Card header={<CardHeader />}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={700}
          minHeight={300}
        >
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="camera" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedEntities.map((item) => (
              <Bar
                key={item.id}
                dataKey={item.id}
                name={item.name}
                fill={"#" + Math.floor(Math.random() * 16777215).toString(16)}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div className={"pt-3 flex  gap-4 items-center"}>
          <div className={"flex  gap-2 items-center"}>
            <span>Date:</span>
            {/* <DatePicker
              format={timeOption === "month" ? "MMM-YYYY" : "DD-MMM-YYYY"}
              onChange={setDate}
              defaultValue={date}
              allowClear={false}
              picker={timeOption === "month" ? timeOption : undefined}
            /> */}
          </div>

          <div className={"grow flex  gap-2 items-center"}>
            <span>Entities:</span>
            <Select
              mode="multiple"
              className="w-full"
              allowClear
              popupMatchSelectWidth={false}
              placeholder="Please select"
              onChange={handleEntitySelectChange}
              options={entityOptions}
            />
          </div>

          <div className={"grow flex  gap-2 items-center"}>
            <span className="whitespace-nowrap">Cameras :</span>
            <Select
              mode="multiple"
              className="w-full"
              allowClear
              popupMatchSelectWidth={false}
              placeholder="Please select"
              onChange={handleCameraSelectChange}
              options={cameraOptions}
            />
          </div>
        </div>
      </Card>
    </>
  );
};
