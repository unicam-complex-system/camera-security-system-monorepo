import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Session } from "@/types";

// Define the initial state using that type
const initialState = null as Session;

export const sessionSlice = createSlice({
  name: "session",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    logIn: (state: Session, action: PayloadAction<Exclude<Session, null>>) => {
      state = action.payload;
    },
  },
});

export const { logIn } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSession = (state: RootState) => state.session;

export default sessionSlice.reducer;
