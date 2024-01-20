import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Notification, NotificationState } from "@/types";

// Define the initial state using that type
const initialState = { currentNotification: null } as NotificationState;

export const notificationSlice = createSlice({
  name: "notification",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    openNotification: (
      state: NotificationState,
      action: PayloadAction<Notification>
    ) => {
      state.currentNotification = action.payload;
    },
    closeNotification: (state: NotificationState) => {
      state.currentNotification = null;
    },
  },
});

export const { openNotification, closeNotification } =
  notificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNotification = (state: RootState) =>
  state.notification.currentNotification;

export default notificationSlice.reducer;
