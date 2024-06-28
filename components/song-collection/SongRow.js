import { useState, useEffect, useContext } from "react";
import styles from "@/modules/spotify.module.scss";
import { BASE_URL } from "../utils/fetcher";
import { getAudioDuration } from "../utils/utilities";
import { SpotifyContext } from "@/modules/Spotify";
import { connect, useDispatch } from "react-redux";
import { modifyCurrentSong } from "../redux/slices/currentSongSlice";

const SongRow = ({ songData = {}, currentSongId }) => {
  //hook instances
  const dispatch = useDispatch();
  //access states
  const { setCurrentSongData } = useContext(SpotifyContext);
  //define states
  const [songDuration, setSongDuration] = useState("");

  //handler functions
  const handleCurrentSong = () => {
    setCurrentSongData(songData);
    dispatch(modifyCurrentSong(songData?.id));
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
      <span className={styles.duration}>{songDuration}</span>
    </div>
  );
};
export default connect(({ currentSong }) => ({
  currentSongId: currentSong.currentSongId || "",
}))(SongRow);
