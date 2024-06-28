import { createSlice } from "@reduxjs/toolkit";

export const currentSongSlice = createSlice({
  name: "currentSong",
  initialState: {
    currentSong: {},
    currentTab: "toptracks",
  },
  reducers: {
    modifyCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    switchCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { modifyCurrentSong, switchCurrentTab } = currentSongSlice.actions;
export default currentSongSlice.reducer;
