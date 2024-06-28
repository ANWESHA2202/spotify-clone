import { persistor, store } from "@/components/redux/store";
import Spotify from "@/modules/Spotify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Spotify />
        </PersistGate>
      </Provider>
    </>
  );
}
