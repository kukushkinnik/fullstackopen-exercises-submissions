/* eslint-disable default-case */
import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      state = action.payload;
      return state;
    case "HIDE":
      state = "";
      return state;

  }
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [message, notificationDispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={[message, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
}

export default NotificationContext;