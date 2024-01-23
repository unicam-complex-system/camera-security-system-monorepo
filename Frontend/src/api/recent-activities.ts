import { Activity } from "@/types";
import { axiosClient } from "./axios-client";
import { endpoints } from "./endpoints";

type RecentActivitiesResponseDTO = {
  data: Activity[];
  count: number;
};

export const getRecentActivities = (top: number, skip: number) => {
  return () =>
    axiosClient
      .get<RecentActivitiesResponseDTO>(`${endpoints.recentActivities}/${top}/${skip}`, {})
      .then((result) => result.data);
};
