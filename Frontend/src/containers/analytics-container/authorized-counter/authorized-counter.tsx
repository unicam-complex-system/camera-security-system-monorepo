import React, { useState } from "react";
import type { FC } from "react";
import { SecurityScanOutlined } from "@ant-design/icons";
import { Statistic, Select, DatePicker } from "antd";
import { Card } from "@/components";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { theme } from "../../../../theme";

export const AuthorizedCounterContainer: FC = () => {
  const [timeOption, setTimeOption] = useState<"day" | "month">("day");
  const [date, setDate] = useState<Dayjs>(dayjs());

  const CardHeader: FC = () => {
    return (
      <div className="text-sm flex gap-x-4 justify-between items-center">
        <span>Authorized access</span>
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
          className="text-success py-4"
          value={458}
          valueStyle={{
            color: theme.colors.successColor,
            fontSize: "2rem",
            textAlign: "center",
          }}
          prefix={<SecurityScanOutlined />}
        />
        <div className={"flex flex-col gap-2 justify-center items-center"}>
          <span>No of attempts on:</span>
          <div>
            {/* <DatePicker
              format={timeOption === "month" ? "MMM-YYYY" : "DD-MMM-YYYY"}
              onChange={setDate}
              defaultValue={date}
              allowClear={false}
              picker={timeOption === "month" ? timeOption : undefined}
            /> */}
          </div>
        </div>
      </Card>
    </>
  );
};
