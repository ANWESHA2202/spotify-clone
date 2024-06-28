import { createSlice } from "@reduxjs/toolkit";

export const currentSongSlice = createSlice({
  name: "currentSong",
  initialState: {
    currentSongId: "",
    currentTab: "toptracks",
  },
  reducers: {
    modifyCurrentSong: (state, action) => {
      state.currentSongId = action.payload;
    },
    switchCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { modifyCurrentSong, switchCurrentTab } = currentSongSlice.actions;
export default currentSongSlice.reducer;
