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
    },
    voteNotification(state, action) {
      state = `You voted for ${action.payload}`;
      return state;
    }
  },

})

export const { newNotification, hideNotification, voteNotification } = notificationSlice.actions;

export default notificationSlice.reducer;