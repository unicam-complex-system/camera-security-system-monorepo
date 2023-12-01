import { useAppDispatch, useAppSelector } from "./store-hooks";
import { Session } from "@/types";
import { selectSession, logIn } from "@/store";

export const useSessionSlice = () => {
  const dispatch = useAppDispatch();

  /* redux session state properties */
  const session: Session = useAppSelector(selectSession);

  /* redux session state updaters */
  const logInState = (newSession: Exclude<Session, null>) => {
    dispatch(logIn(newSession));
  };

  return {
    session: session,
    logIn: logInState,
  };
};
