"use client";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import { Table } from "@/components";
import { recentActivitiesData, recentActivitiesColumns } from "@/data";
import { getRecentActivities, getRecentActivitiesCount } from "@/api";
import { useQuery } from "react-query";
import { openNotification } from "@/store";
import { useCameraSlice } from "@/hooks";

/* This container renders recent activites table */

type PropsType = {};

export const RecentActivitiesContainer: FC<PropsType> = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { cameras } = useCameraSlice();

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
    refetch: refechRecentActivites,
  } = useQuery(
    ["recentActivities", pageNumber],
    getRecentActivities(10, pageNumber - 1),
    { keepPreviousData: true, enabled: false }
  );

  useEffect(() => {
    if (recentActivitiesCountFetchedData) {
      console.log(recentActivitiesCountFetchedData);
      refechRecentActivites();
    }
  }, [recentActivitiesCountFetchedData]);

  useEffect(() => {
    if (isErrorRecentActivities) {
      openNotification({
        type: "error",
        message: isErrorRecentActivities?.response?.data
          ? isErrorRecentActivities?.response?.data?.message
          : isErrorRecentActivities?.message,
      });
    }

    if (isErrorRecentActivitiesCount) {
      openNotification({
        type: "error",
        message: isErrorRecentActivitiesCount?.response?.data
          ? isErrorRecentActivitiesCount?.response?.data?.message
          : isErrorRecentActivitiesCount?.message,
      });
    }
  }, [isErrorRecentActivities, isErrorRecentActivitiesCount]);

  return (
    <>
      <Table
        columns={recentActivitiesColumns}
        data={
          /* recentActivitiesFetchedData */ recentActivitiesData?.map(
          (event) => ({
            ...event,
            cameraName: cameras.find((item) => item.id == event.cameraId)?.name,
          })
        )
        }
        pagination={{
          total: recentActivitiesCountFetchedData,
          onChange: setPageNumber,
        }}
        rowKey={"_id"}
        loading={isLoadingRecentActivitiesCount || isLoadingRecentActivities}
      />
    </>
  );
};
