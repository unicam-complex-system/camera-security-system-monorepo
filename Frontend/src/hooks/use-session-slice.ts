import { useAppDispatch, useAppSelector } from "./store-hooks";
import { Session } from "@/types";
import { selectSession, logIn, logOut } from "@/store";

export const useSessionSlice = () => {
  const dispatch = useAppDispatch();

  /* redux session state properties */
  const session: Session = useAppSelector(selectSession);

  /* redux session state updaters */
  const logInState = (newSession: Session) => {
    dispatch(logIn(newSession));
  };

  const logOutState = () => {
    dispatch(logOut());
  };

  return {
    session: session,
    logIn: logInState,
    logOut: logOutState,
  };
};
