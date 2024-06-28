import { createSlice } from "@reduxjs/toolkit";

export const currentSongSlice = createSlice({
  name: "currentSong",
  initialState: {
    currentSong: {},
  },
  reducers: {
    modifyCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { modifyCurrentSong } = currentSongSlice.actions;
export default currentSongSlice.reducer;
