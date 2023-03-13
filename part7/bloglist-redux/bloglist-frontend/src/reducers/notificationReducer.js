import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification(state, action) {
      state =  action.payload;
      return state;
    },
    // eslint-disable-next-line no-unused-vars
    hideNotification(state, action) {
      state = "";
      return state;
    },
  },
});

export const { newNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, type, timer) => {
  return (dispatch) => {
    dispatch(newNotification({ message, type }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, timer * 1000);
  };
};

export default notificationSlice.reducer;
