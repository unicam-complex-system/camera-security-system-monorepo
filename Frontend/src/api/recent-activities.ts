import { Activity } from "@/types";
import { axiosClient } from "./axios-client";
import { endpoints } from "./endpoints";

type RecentActivitiesResponseDTO = {
  data: Activity[];
};

type RecentActivitiesCountResponseDTO = {
  _id: string;
  count: number;
}[];

type RecentActivityImageResponseDTO = {
  data: any;
};

export const getRecentActivities = (top: number, skip: number) => {
  return () =>
    axiosClient
      .get<RecentActivitiesResponseDTO>(
        `${endpoints.recentActivities}/${top}/${skip}`,
        {}
      )
      .then((result) => result.data);
};

export const getRecentActivitiesCount = () => {
  return () =>
    axiosClient
      .get<RecentActivitiesCountResponseDTO>(
        `${endpoints.getIntrusionCount}`,
        {}
      )
      .then((result) => {
        let totalCount = 0;

        result.data.forEach((item) => {
          totalCount += item.count;
        });

        return totalCount;
      });
};

export const getActivityImage = (id: string, timestamp: string) => {
  return () =>
    axiosClient
      .get<RecentActivityImageResponseDTO>(
        `${id}/${timestamp}`,
        {}
      )
      .then((result) => result.data);
};
