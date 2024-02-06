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
    refetch: refetchCount,
  } = useQuery("recentActivitiesCount", getRecentActivitiesCount(), {
    enabled: false,
  });

  // get paginated recent activities
  const {
    isLoading: isLoadingRecentActivities,
    error: isErrorRecentActivities,
    data: recentActivitiesFetchedData,
    refetch: refechRecentActivites,
  } = useQuery(
    ["recentActivities", pageNumber],
    getRecentActivities(10, pageNumber - 1),
    {
      keepPreviousData: true,
      enabled: recentActivitiesCountFetchedData != undefined,
    }
  );

  useEffect(() => {
    refetchCount();
  }, []);

  useEffect(() => {
    if (recentActivitiesCountFetchedData) {
      console.log(recentActivitiesCountFetchedData);
      refechRecentActivites();
    }
  }, [recentActivitiesCountFetchedData]);

  useEffect(() => {
    if (pageNumber) {
      console.log(pageNumber);
      refechRecentActivites();
    }
  }, [pageNumber]);

  useEffect(() => {
    if (isErrorRecentActivities) {
      const error: any = isErrorRecentActivities;
      openNotification({
        type: "error",
        message: error?.response?.data
          ? error?.response?.data?.message
          : error?.message,
      });
    }

    if (isErrorRecentActivitiesCount) {
      const error: any = isErrorRecentActivitiesCount;
      openNotification({
        type: "error",
        message: error?.response?.data
          ? error?.response?.data?.message
          : error?.message,
      });
    }
  }, [isErrorRecentActivities, isErrorRecentActivitiesCount]);

  return (
    <>
      {recentActivitiesCountFetchedData && (
        <div className="py-4">
          <span className="font-bold">Total Detections:</span>{" "}
          {recentActivitiesCountFetchedData}
        </div>
      )}
      <Table
        columns={recentActivitiesColumns}
        data={recentActivitiesFetchedData?.map((event) => ({
          ...event,
          cameraName: cameras.find((item) => item.id == event.cameraId)?.name,
        }))}
        pagination={{
          total: recentActivitiesCountFetchedData,
          onChange: (pageNumber) => setPageNumber(pageNumber),
        }}
        rowKey={"_id"}
        loading={isLoadingRecentActivitiesCount || isLoadingRecentActivities}
      />
    </>
  );
};
