import React from "react";
import type { FC } from "react";
import { Card, Table } from "@/components";
import { recentActivitiesData, recentActivitiesColumns } from "@/data";

export const RecentUnauthorizedContainer: FC = () => {
  // const authorizedEntities = recentActivitiesData
  //   .filter((item) => item.entity === undefined)
  //   .slice(0, 5);
  return (
    <>
      <Card header={"Recent Unauthorzied Activities"}>
        <div className="py-4">
          {/* <Table columns={recentActivitiesColumns} data={authorizedEntities} rowKey={"id"} /> */}
        </div>
      </Card>
    </>
  );
};
