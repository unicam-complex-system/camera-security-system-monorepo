import React, { useState } from "react";
import type { FC } from "react";
import { Select, DatePicker } from "antd";
import { Card } from "@/components";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { theme } from "../../../../theme";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export const AuthorizedUnauthorizedPieContainer: FC = () => {
  const [timeOption, setTimeOption] = useState<"day" | "month">("day");
  const [date, setDate] = useState<Dayjs>(dayjs());
  const data01 = [
    { name: "Authorized Entity", value: 458, fill: theme.colors.successColor },
    {
      name: "Unauthorized Entity",
      value: 180,
      fill: theme.colors.dangerColor,
    },
  ];

  const CardHeader: FC = () => {
    return (
      <div className="text-sm flex gap-x-4 justify-between items-center">
        <span>Access proportion</span>
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
        <ResponsiveContainer minWidth={200} minHeight={200}>
          <PieChart width={180} height={180}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className={"flex flex-col gap-2 justify-center items-center"}>
          <span>Date:</span>
          <div>
            <DatePicker
              format={timeOption === "month" ? "MMM-YYYY" : "DD-MMM-YYYY"}
              onChange={setDate}
              defaultValue={date}
              allowClear={false}
              picker={timeOption === "month" ? timeOption : undefined}
            />
          </div>
        </div>
      </Card>
    </>
  );
};
