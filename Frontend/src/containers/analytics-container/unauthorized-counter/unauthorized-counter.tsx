import React, { useState } from "react";
import type { FC } from "react";
import { FireOutlined } from "@ant-design/icons";
import { Statistic, Select, DatePicker } from "antd";
import { Card } from "@/components";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { theme } from "../../../../theme";

export const UnauthorizedCounterContainer: FC = () => {
  const [timeOption, setTimeOption] = useState<"day" | "month">("day");
  const [date, setDate] = useState<Dayjs>(dayjs());

  const CardHeader: FC = () => {
    return (
      <div className="text-sm flex gap-x-4 justify-between items-center">
        <span>Unauthorized access</span>
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
        <Statistic
          className="text-danger py-4"
          value={180}
          valueStyle={{
            color: theme.colors.dangerColor,
            fontSize: "2rem",
            textAlign: "center",
          }}
          prefix={<FireOutlined />}
        />
        <div className={"flex flex-col gap-2 justify-center items-center"}>
          <span>No of attempts on:</span>
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
