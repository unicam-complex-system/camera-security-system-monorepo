import { User } from "./user";

/** This is a data type that denotes a session. Session is composed of
 * properties required when a user is logged in such as accessToken,user, etc.
 * */
export type Session = {
  accessToken: string;
  user: User;
} | null;
