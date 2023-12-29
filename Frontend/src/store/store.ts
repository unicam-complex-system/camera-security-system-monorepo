import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/session-slice";
import cameraReducer from "./slices/camera-slice";
import notificationReducer from "./slices/notification-slice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    camera: cameraReducer,
    notification: notificationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
