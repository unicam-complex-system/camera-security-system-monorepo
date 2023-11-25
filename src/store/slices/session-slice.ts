import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Session } from "@/types";

// Define the initial state using that type
const initialState = {
  accessToken: "asdf1234hbhj123bkdshfh2389317492013r0hf1273y4rwefh29fy10",
  user: {
    firstName: "Nabil Mohammed",
    lastName: "Khelifa",
    email: "nabil.nablotech@gmail.com",
    mobileNumber: "393513117160",
  },
} as Session;

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
