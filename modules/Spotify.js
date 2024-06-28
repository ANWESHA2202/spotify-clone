//hooks import
import { createContext, useState } from "react";
//styles import
import styles from "./spotify.module.scss";
//ui components
import Profile from "./Profile/Profile";
import SongCollection from "./SongCollection/SongCollection";

//create context
export const SpotifyContext = createContext();

const Spotify = () => {
  //define states
  const [currentSongData, setCurrentSongData] = useState({});
  const [songCollections, setSongCollections] = useState([]);

  return (
    <SpotifyContext.Provider
      value={{
        currentSongData,
        setCurrentSongData,
        songCollections,
        setSongCollections,
      }}
    >
      <div className={styles.spotifyContainer}>
        <Profile />
        <SongCollection />
      </div>
    </SpotifyContext.Provider>
  );
};

export default Spotify;
