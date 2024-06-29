//hooks import
import { createContext, useEffect, useState } from "react";
//styles import
import styles from "./spotify.module.scss";
//ui components
import Profile from "./Profile/Profile";
import SongCollection from "./SongCollection/SongCollection";
import CurrentSong from "./CurrentSelection/CurrentSong";
import { useMediaQuery } from "@mui/material";

//create context
export const SpotifyContext = createContext();

const Spotify = () => {
  //hook instances
  const matches = useMediaQuery("@media (max-width: 800px)");
  //define states
  const [currentSongData, setCurrentSongData] = useState({});
  const [songCollections, setSongCollections] = useState([]);

  useEffect(() => {
    if (matches) {
      let ele = document.getElementById("songCollectionsContainer");
      let eleToHide = document.getElementById("playerContainer");
      ele.style.width = "100%";
      ele.style.transition = "all 0.2s ease-in-out";
      eleToHide.classList.add(styles.inactive);
      ele.classList.remove(styles.inactive);
      eleToHide.style.width = 0;
    }
  }, [matches]);

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
        id="spotifyContainer"
        style={{
          background: `linear-gradient(to bottom right, ${
            currentSongData?.accent || "rgba(54, 134, 30, 0.37)"
          }, #000 90% 100%)`,
        }}
      >
        <Profile />

        {!matches ? (
          <>
            <SongCollection />
            <CurrentSong />
          </>
        ) : (
          <div className={styles.currentTabs}>
            <SongCollection />
            <CurrentSong />
          </div>
        )}
      </div>
    </SpotifyContext.Provider>
  );
};

export default Spotify;
