"use client";
import type { FC } from "react";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "@/components";
import { recentActivitiesData, recentActivitiesColumns } from "@/data";
import { getRecentActivities } from "@/api";
import { useQuery } from "react-query";

/* This container renders recent activites table */

type PropsType = {};

export const RecentActivitiesContainer: FC<PropsType> = () => {
  const { isLoading, error, data } = useQuery(
    "recentActivities",
    getRecentActivities(10, 0)
  );

  return (
    <>
      <Table
        columns={recentActivitiesColumns}
        data={data?.data}
        pagination={{ total: data?.count }}
        rowKey={"id"}
        loading={isLoading}
      />
    </>
  );
};
