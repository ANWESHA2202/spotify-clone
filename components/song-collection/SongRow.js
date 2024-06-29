import { useState, useEffect, useContext } from "react";
import styles from "@/modules/spotify.module.scss";
import { BASE_URL } from "../utils/fetcher";
import { getAudioDuration } from "../utils/utilities";
import { SpotifyContext } from "@/modules/Spotify";
import { connect, useDispatch } from "react-redux";
import { modifyCurrentSong } from "../redux/slices/currentSongSlice";
import { useMediaQuery } from "@mui/material";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

const SongRow = ({ songData = {}, currentSongId }) => {
  //hook instances
  const dispatch = useDispatch();
  const matches = useMediaQuery("@media (max-width: 800px)");
  //access states
  const { setCurrentSongData } = useContext(SpotifyContext);
  //define states
  const [songDuration, setSongDuration] = useState("");

  //handler functions
  const handleCurrentSong = () => {
    setCurrentSongData(songData);
    dispatch(modifyCurrentSong(songData?.id));
    if (matches) {
      let eleToHide = document.getElementById("songCollectionsContainer");
      let ele = document.getElementById("playerContainer");
      ele.style.transition = "all 0.2s ease-in-out";
      ele.style.width = "100%";
      eleToHide.classList.add(styles.inactive);
      ele.classList.remove(styles.inactive);
      eleToHide.style.width = 0;
    }
  };

  //helper functions
  const findAudioDuration = async () => {
    let duration = await getAudioDuration(songData?.url);
    if (duration) {
      setSongDuration(duration);
    }
  };

  //useEffects
  useEffect(() => {
    findAudioDuration();
  }, []);

  return (
    <div
      className={`${styles.songRow} ${
        songData?.id === currentSongId ? styles.active : ""
      }`}
      id={`song${songData?.id}`}
      onClick={() => handleCurrentSong()}
    >
      <div className={styles.leftSection}>
        <img
          height={40}
          width={40}
          src={`${BASE_URL}/assets/${songData?.cover}`}
        />
        <div className={styles.textInfo}>
          <div>{songData?.name}</div>
          <div>{songData?.artist}</div>
        </div>
      </div>
      <span className={styles.duration}>
        {songDuration}
        {matches ? (
          <span>
            <ArrowForwardIosRounded />
          </span>
        ) : null}
      </span>
    </div>
  );
};
export default connect(({ currentSong }) => ({
  currentSongId: currentSong.currentSongId || "",
}))(SongRow);
