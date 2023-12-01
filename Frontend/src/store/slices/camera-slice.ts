import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Camera } from "@/types";

// CameraSlice State type
type CameraStateType = {
  cameras: Camera[];
  cameraCount: number;
  activeCameraCount: number;
  isFullScreenGrid: boolean;
};

// Define the initial state using that type
const initialState = {
  cameras: [
    {
      key: "backyard",
      name: "Backyard",
      isActive: true,
      url: "https://www.youtube.com/embed/Sv2h-csnlps?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
    },
    {
      key: "main-road",
      name: "Main road",
      isActive: true,
      url: "https://www.youtube.com/embed/yNQmth5kUZ0?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
    },
    {
      key: "door",
      name: "Door",
      isActive: true,
      url: "https://www.youtube.com/embed/dV9ngLCKE7k?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
    },
    {
      key: "pet-room",
      name: "Pet room",
      isActive: true,
      url: "https://www.youtube.com/embed/ewEW_xAKRMg?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
    },
    {
      key: "basement",
      name: "Basement",
      isActive: false,
      url: "https://www.youtube.com/embed/ewEW_xAKRMg?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
    },
    {
      key: "baby-room",
      name: "Baby room",
      isActive: false,
      url: "https://www.youtube.com/embed/ewEW_xAKRMg?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
    },
  ],
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
    updateCamera: (state: CameraStateType, action: PayloadAction<Camera>) => {
      state.cameras = state.cameras.map((item) => {
        if (item.key === action.payload.key) {
          return action.payload;
        }
        return item;
      });
    },
    toggleIsFullScreenGrid: (state: CameraStateType) => {
      state.isFullScreenGrid = !state.isFullScreenGrid;
    },
  },
});

export const { updateCamera, toggleIsFullScreenGrid } = cameraSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCameras = (state: RootState) => state.camera.cameras;
export const selectCameraCount = (state: RootState) => state.camera.cameraCount;
export const selectIsFullScreenGrid = (state: RootState) =>
  state.camera.isFullScreenGrid;
export const selectActiveCameraCount = (state: RootState) =>
  state.camera.activeCameraCount;

export default cameraSlice.reducer;
