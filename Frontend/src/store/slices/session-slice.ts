import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Session, SessionState } from "@/types";

// Define the initial state using that type
const initialState = {
  currentSession: null,
} as SessionState;

export const sessionSlice = createSlice({
  name: "session",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    logIn: (state: SessionState, action: PayloadAction<Session>) => {
      state.currentSession = action.payload;
    },
    logOut: (state: SessionState) => {
      state.currentSession = null;
    },
  },
});

export const { logIn, logOut } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSession = (state: RootState) => state.session.currentSession;

export default sessionSlice.reducer;
