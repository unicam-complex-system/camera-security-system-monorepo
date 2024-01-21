"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Camera } from "@/types";
import { cameras } from "@/data";

// CameraSlice State type
type CameraStateType = {
  cameras: Camera[];
  cameraCount: number;
  activeCameraCount: number;
  isFullScreenGrid: boolean;
};

// Define the initial state using that type
const initialState = {
  cameras: [],
  cameraCount: 8,
  activeCameraCount: 4,
  isFullScreenGrid: false,
} as CameraStateType;

export const cameraSlice = createSlice({
  name: "camera",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCameras: (state: CameraStateType, action: PayloadAction<Camera[]>) => {
      state.cameras = [...action.payload];
    },
    updateCamera: (state: CameraStateType, action: PayloadAction<Camera>) => {
      state.cameras = state.cameras.map((item) => {
        if (item.key === action.payload.key) {
          return action.payload;
        }
        return item;
      });
    },
    toggleIsFullScreenGrid: (
      state: CameraStateType,
      action: PayloadAction<boolean>
    ) => {
      state.isFullScreenGrid = action.payload;
    },
  },
});

export const { updateCamera, toggleIsFullScreenGrid, setCameras } =
  cameraSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCameras = (state: RootState) => state.camera.cameras;
export const selectCameraCount = (state: RootState) => state.camera.cameraCount;
export const selectIsFullScreenGrid = (state: RootState) =>
  state.camera.isFullScreenGrid;
export const selectActiveCameraCount = (state: RootState) =>
  state.camera.activeCameraCount;

export default cameraSlice.reducer;
