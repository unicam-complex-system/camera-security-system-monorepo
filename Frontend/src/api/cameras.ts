import { Activity, AnyObject, Camera } from "@/types";
import { axiosClient } from "./axios-client";
import { endpoints } from "./endpoints";

type CamerasResponseDTO = Camera[];
type CameraSettingUpdateResponseDTO = any;

export const getCameras = () => {
  return () =>
    axiosClient
      .get<CamerasResponseDTO>(`${endpoints.getCameras}`, {})
      .then((result) => result.data);
};

export const updateCamera = async (configuration: AnyObject) => {
  for (const key in configuration) {
    try {
      await axiosClient
        .post<CamerasResponseDTO>(`${key}/${configuration[key]}`, {});
    } catch (error: any) {
      console.log(error);
    }

  }
  return "Success"

};
