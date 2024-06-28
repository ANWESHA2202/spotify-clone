import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
  },
  reducers: {
    loginUser: (state, action) => {
      state.userData = action.payload;
    },
    logoutUser: (state, action) => {
      state.userData = {};
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
