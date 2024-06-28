import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducers from "./slices/authSlice";
import currentSongReducer from "./slices/currentSongSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducers);
const persistedCurrentSongReducer = persistReducer(
  persistConfig,
  currentSongReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    currentSong: persistedCurrentSongReducer,
  },
});

export const persistor = persistStore(store);
