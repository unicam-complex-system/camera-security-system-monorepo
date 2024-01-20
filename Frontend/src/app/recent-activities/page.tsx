"use client";
import { Table } from "@/components";
import { recentActivitiesData, recentActivitiesColumns } from "@/data";

export default function RecentActivities() {
  return (
    <div>
      <Table
        columns={recentActivitiesColumns}
        data={recentActivitiesData}
        pagination={{ total: recentActivitiesData.length }}
        rowKey={"id"}
      />
    </div>
  );
}
