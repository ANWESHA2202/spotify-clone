import { createSlice } from "@reduxjs/toolkit";

export const currentSongSlice = createSlice({
  name: "currentSong",
  initialState: {
    currentSongId: "",
    previousSongStack: [],
    currentTab: "toptracks",
  },
  reducers: {
    modifyCurrentSong: (state, action) => {
      state.currentSongId = action.payload;
      state.previousSongStack = [action.payload, ...state.previousSongStack];
    },
    switchCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },

    removeFromPreviousStack: (state, action) => {
      if (state.previousSongStack && state.previousSongStack.length > 0) {
        const newStack = [...state.previousSongStack];
        newStack.shift(); // Remove the first element
        if (newStack.length > 0) {
          newStack.shift(); // Remove the second element if it exists
        }
        state.previousSongStack = newStack;
      }
    },
  },
});

export const { modifyCurrentSong, switchCurrentTab, removeFromPreviousStack } =
  currentSongSlice.actions;
export default currentSongSlice.reducer;
