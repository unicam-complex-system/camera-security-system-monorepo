import React, { useState } from "react";
import type { FC } from "react";
import { Select, DatePicker } from "antd";
import { Card } from "@/components";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { theme } from "../../../../theme";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

export const AuthorizedUnauthorizedLineContainer: FC = () => {
  const [timeOption, setTimeOption] = useState<"day" | "month">("day");
  const [date, setDate] = useState<Dayjs>(dayjs());
  const data01 = {
    month: [
      {
        time: "1",
        authorizedEntity: 291,
        unauthorizedEntity: 925,
      },
      {
        time: 2,
        authorizedEntity: 630,
        unauthorizedEntity: 825,
      },
      {
        time: 3,
        authorizedEntity: 156,
        unauthorizedEntity: 43,
      },
      {
        time: 4,
        authorizedEntity: 87,
        unauthorizedEntity: 588,
      },
      {
        time: 5,
        authorizedEntity: 456,
        unauthorizedEntity: 244,
      },
      {
        time: 6,
        authorizedEntity: 814,
        unauthorizedEntity: 694,
      },
      {
        time: 7,
        authorizedEntity: 266,
        unauthorizedEntity: 267,
      },
      {
        time: 8,
        authorizedEntity: 280,
        unauthorizedEntity: 76,
      },
      {
        time: 9,
        authorizedEntity: 584,
        unauthorizedEntity: 441,
      },
      {
        time: 10,
        authorizedEntity: 65,
        unauthorizedEntity: 793,
      },
      {
        time: 11,
        authorizedEntity: 870,
        unauthorizedEntity: 30,
      },
      {
        time: 12,
        authorizedEntity: 362,
        unauthorizedEntity: 207,
      },
      {
        time: 13,
        authorizedEntity: 384,
        unauthorizedEntity: 827,
      },
      {
        time: 14,
        authorizedEntity: 359,
        unauthorizedEntity: 663,
      },
      {
        time: 15,
        authorizedEntity: 706,
        unauthorizedEntity: 878,
      },
      {
        time: 16,
        authorizedEntity: 362,
        unauthorizedEntity: 512,
      },
      {
        time: 17,
        authorizedEntity: 958,
        unauthorizedEntity: 876,
      },
      {
        time: 18,
        authorizedEntity: 501,
        unauthorizedEntity: 676,
      },
      {
        time: 19,
        authorizedEntity: 188,
        unauthorizedEntity: 48,
      },
      {
        time: 20,
        authorizedEntity: 502,
        unauthorizedEntity: 166,
      },
      {
        time: 21,
        authorizedEntity: 496,
        unauthorizedEntity: 905,
      },
      {
        time: 22,
        authorizedEntity: 342,
        unauthorizedEntity: 830,
      },
      {
        time: 23,
        authorizedEntity: 554,
        unauthorizedEntity: 569,
      },
      {
        time: 24,
        authorizedEntity: 894,
        unauthorizedEntity: 78,
      },
      {
        time: 25,
        authorizedEntity: 276,
        unauthorizedEntity: 767,
      },
      {
        time: 26,
        authorizedEntity: 760,
        unauthorizedEntity: 61,
      },
      {
        time: 27,
        authorizedEntity: 451,
        unauthorizedEntity: 174,
      },
      {
        time: 28,
        authorizedEntity: 568,
        unauthorizedEntity: 994,
      },
      {
        time: 29,
        authorizedEntity: 954,
        unauthorizedEntity: 799,
      },
      {
        time: 30,
        authorizedEntity: 463,
        unauthorizedEntity: 560,
      },
      {
        time: 31,
        authorizedEntity: 744,
        unauthorizedEntity: 207,
      },
    ],
    day: [
      {
        time: "00:00",
        authorizedEntity: 913,
        unauthorizedEntity: 185,
      },
      {
        time: "00:30",
        authorizedEntity: 702,
        unauthorizedEntity: 861,
      },
      {
        time: "01:00",
        authorizedEntity: 379,
        unauthorizedEntity: 492,
      },
      {
        time: "01:30",
        authorizedEntity: 172,
        unauthorizedEntity: 416,
      },
      {
        time: "02:00",
        authorizedEntity: 963,
        unauthorizedEntity: 504,
      },
      {
        time: "02:30",
        authorizedEntity: 524,
        unauthorizedEntity: 830,
      },
      {
        time: "03:00",
        authorizedEntity: 198,
        unauthorizedEntity: 131,
      },
      {
        time: "03:30",
        authorizedEntity: 254,
        unauthorizedEntity: 584,
      },
      {
        time: "04:00",
        authorizedEntity: 905,
        unauthorizedEntity: 894,
      },
      {
        time: "04:30",
        authorizedEntity: 434,
        unauthorizedEntity: 458,
      },
      {
        time: "05:00",
        authorizedEntity: 618,
        unauthorizedEntity: 474,
      },
      {
        time: "05:30",
        authorizedEntity: 654,
        unauthorizedEntity: 56,
      },
      {
        time: "06:00",
        authorizedEntity: 114,
        unauthorizedEntity: 143,
      },
      {
        time: "06:30",
        authorizedEntity: 384,
        unauthorizedEntity: 713,
      },
      {
        time: "07:00",
        authorizedEntity: 383,
        unauthorizedEntity: 473,
      },
      {
        time: "07:30",
        authorizedEntity: 313,
        unauthorizedEntity: 866,
      },
      {
        time: "08:00",
        authorizedEntity: 648,
        unauthorizedEntity: 518,
      },
      {
        time: "08:30",
        authorizedEntity: 268,
        unauthorizedEntity: 847,
      },
      {
        time: "09:00",
        authorizedEntity: 347,
        unauthorizedEntity: 888,
      },
      {
        time: "09:30",
        authorizedEntity: 981,
        unauthorizedEntity: 106,
      },
      {
        time: "10:00",
        authorizedEntity: 913,
        unauthorizedEntity: 490,
      },
      {
        time: "10:30",
        authorizedEntity: 701,
        unauthorizedEntity: 730,
      },
      {
        time: "11:00",
        authorizedEntity: 834,
        unauthorizedEntity: 896,
      },
      {
        time: "11:30",
        authorizedEntity: 954,
        unauthorizedEntity: 681,
      },
      {
        time: "12:00",
        authorizedEntity: 342,
        unauthorizedEntity: 371,
      },
      {
        time: "12:30",
        authorizedEntity: 518,
        unauthorizedEntity: 144,
      },
      {
        time: "13:00",
        authorizedEntity: 71,
        unauthorizedEntity: 890,
      },
      {
        time: "13:30",
        authorizedEntity: 484,
        unauthorizedEntity: 26,
      },
      {
        time: "14:00",
        authorizedEntity: 705,
        unauthorizedEntity: 302,
      },
      {
        time: "14:30",
        authorizedEntity: 128,
        unauthorizedEntity: 286,
      },
      {
        time: "15:00",
        authorizedEntity: 292,
        unauthorizedEntity: 171,
      },
      {
        time: "15:30",
        authorizedEntity: 418,
        unauthorizedEntity: 930,
      },
      {
        time: "16:00",
        authorizedEntity: 903,
        unauthorizedEntity: 214,
      },
      {
        time: "16:30",
        authorizedEntity: 195,
        unauthorizedEntity: 185,
      },
      {
        time: "17:00",
        authorizedEntity: 151,
        unauthorizedEntity: 676,
      },
      {
        time: "17:30",
        authorizedEntity: 347,
        unauthorizedEntity: 292,
      },
      {
        time: "18:00",
        authorizedEntity: 404,
        unauthorizedEntity: 357,
      },
      {
        time: "18:30",
        authorizedEntity: 465,
        unauthorizedEntity: 899,
      },
      {
        time: "19:00",
        authorizedEntity: 950,
        unauthorizedEntity: 47,
      },
      {
        time: "19:30",
        authorizedEntity: 962,
        unauthorizedEntity: 881,
      },
      {
        time: "20:00",
        authorizedEntity: 41,
        unauthorizedEntity: 458,
      },
      {
        time: "20:30",
        authorizedEntity: 357,
        unauthorizedEntity: 830,
      },
      {
        time: "21:00",
        authorizedEntity: 145,
        unauthorizedEntity: 110,
      },
      { time: "21:30", authorizedEntity: 521, unauthorizedEntity: 6 },
      {
        time: "22:00",
        authorizedEntity: 548,
        unauthorizedEntity: 167,
      },
      {
        time: "22:30",
        authorizedEntity: 786,
        unauthorizedEntity: 0,
      },
      {
        time: "23:00",
        authorizedEntity: 470,
        unauthorizedEntity: 668,
      },
      {
        time: "23:30",
        authorizedEntity: 840,
        unauthorizedEntity: 579,
      },
      {
        time: "24:00",
        authorizedEntity: 840,
        unauthorizedEntity: 579,
      },
    ],
  };

  const CardHeader: FC = () => {
    return (
      <div className="text-sm flex gap-x-4 justify-between items-center">
        <span>Detection Summary</span>
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
          <LineChart
            width={700}
            height={300}
            data={timeOption === "month" ? data01.month : data01.day}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" interval={"equidistantPreserveStart"}>
              <Label
                value={timeOption === "month" ? "day" : "time"}
                offset={0}
                position="insideBottom"
              />
            </XAxis>
            <YAxis
              label={{
                value: "Frequency",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              name="Authorized Entity"
              dataKey="authorizedEntity"
              stroke={theme.colors.successColor}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              name="Unauthorized Entity"
              dataKey="unauthorizedEntity"
              stroke={theme.colors.dangerColor}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className={"pt-3 flex  gap-2 items-center"}>
          <span>Date:</span>
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
