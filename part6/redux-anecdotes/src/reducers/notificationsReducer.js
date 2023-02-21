import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification(state, action) {
      state = `${action.payload} was added to the list`;
      return state;
    },
    hideNotification(state, action) {
      state = ""
      return state;
    }
  }
})

export const { newNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;