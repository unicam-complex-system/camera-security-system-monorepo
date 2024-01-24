"use client";
import type { FC } from "react";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "@/components";
import { recentActivitiesData, recentActivitiesColumns } from "@/data";
import { getRecentActivities, getRecentActivitiesCount } from "@/api";
import { useQuery } from "react-query";
import { openNotification } from "@/store";

/* This container renders recent activites table */

type PropsType = {};

export const RecentActivitiesContainer: FC<PropsType> = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);

  // Get total number of recent activities
  const {
    isLoading: isLoadingRecentActivitiesCount,
    error: isErrorRecentActivitiesCount,
    data: recentActivitiesCountFetchedData,
  } = useQuery("recentActivitiesCount", getRecentActivitiesCount());

  // get paginated recent activities
  const {
    isLoading: isLoadingRecentActivities,
    error: isErrorRecentActivities,
    data: recentActivitiesFetchedData,
  } = useQuery(
    ["recentActivities", pageNumber],
    getRecentActivities(10, pageNumber),
    { keepPreviousData: true }
  );

    // get camera names
    const {
      isLoading: isLoadingRecentActivities,
      error: isErrorRecentActivities,
      data: recentActivitiesFetchedData,
    } = useQuery(
      ["cameraName", pageNumber],
      getRecentActivities(10, pageNumber),
      { keepPreviousData: true }
    );

  useEffect(() => {
    if (isLoadingRecentActivities) {
      openNotification({
        type: "error",
        message: isLoadingRecentActivities?.response?.data
          ? isLoadingRecentActivities?.response?.data?.message
          : isLoadingRecentActivities?.message,
      });
    }
  }, [isLoadingRecentActivities]);

  return (
    <>
      <Table
        columns={recentActivitiesColumns}
        data={/* data?.data */ recentActivitiesData}
        pagination={{ total: data?.count, onChange: setPageNumber }}
        rowKey={"id"}
        loading={isLoading}
      />
    </>
  );
};
