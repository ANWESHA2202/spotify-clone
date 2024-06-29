//hooks import
import { createContext, useState } from "react";
//styles import
import styles from "./spotify.module.scss";
//ui components
import Profile from "./Profile/Profile";
import SongCollection from "./SongCollection/SongCollection";
import CurrentSong from "./CurrentSelection/CurrentSong";

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
      <div
        className={styles.spotifyContainer}
        style={{
          background: `linear-gradient(to bottom right, ${
            currentSongData?.accent || "rgba(54, 134, 30, 0.37)"
          }, #000 90% 100%)`,
        }}
      >
        <Profile />
        <SongCollection />
        <CurrentSong />
      </div>
    </SpotifyContext.Provider>
  );
};

export default Spotify;
