import { useAppDispatch, useAppSelector } from "./store-hooks";
import { Camera } from "@/types";
import {
  selectCameras,
  selectCameraCount,
  selectActiveCameraCount,
  selectIsFullScreenGrid,
  updateCamera,
  toggleIsFullScreenGrid,
} from "@/store";

export const useCameraSlice = () => {
  const dispatch = useAppDispatch();

  /* redux camera state properties */
  const cameras: Camera[] = useAppSelector(selectCameras);
  const cameraCount: number = useAppSelector(selectCameraCount);
  const activeCameraCount: number = useAppSelector(selectActiveCameraCount);
  const isFullScreenGrid: boolean = useAppSelector(selectIsFullScreenGrid);

  /* redux camera state updaters */
  const updateCameraState = (updatedCamera: Camera) => {
    dispatch(updateCamera(updatedCamera));
  };

  const toggleIsFullScreenGridState = () => {
    dispatch(toggleIsFullScreenGrid());
  };

  return {
    cameras: cameras,
    cameraCount: cameraCount,
    activeCameraCount: activeCameraCount,
    isFullScreenGrid: isFullScreenGrid,
    updateCamera: updateCameraState,
    toggleIsFullScreenGrid: toggleIsFullScreenGridState,
  };
};
