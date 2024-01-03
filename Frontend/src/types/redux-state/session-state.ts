import { Session } from "../models/session";

/** This is a data type that denotes a data type of the session redux slice.
 * */
export type SessionState = {
  currentSession: Session | null;
};
