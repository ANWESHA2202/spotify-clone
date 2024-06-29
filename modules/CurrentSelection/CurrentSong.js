//hooks import
import { connect, useDispatch } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";
//import styles
import styles from "@/modules/spotify.module.scss";
//context
import { SpotifyContext } from "../Spotify";
import { modifyCurrentSong } from "@/components/redux/slices/currentSongSlice";
import { BASE_URL } from "@/components/utils/fetcher";
import {
  FastForwardRounded,
  FastRewindOutlined,
  FastRewindRounded,
  PauseCircle,
  PlayCircleFilledRounded,
} from "@mui/icons-material";

let INTERVAL = null;

const CurrentSong = ({ currentSongId, currentTab }) => {
  //hooks instances
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const playerRef = useRef(null);
  //access states
  const { currentSongData, setCurrentSongData, songCollections } =
    useContext(SpotifyContext);

  //define states
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchFirstCurrentSong = () => {
    if (currentSongId) {
      let currentSong = songCollections?.find(
        (song) => song?.id == currentSongId
      );
      if (currentSong) {
        setCurrentSongData(currentSong);
      }
    } else {
      let activeTabSongs = songCollections?.filter((song) => {
        if (currentTab === "foryou") {
          return true;
        } else {
          return song?.top_track === true;
        }
      });
      let firstSong = activeTabSongs ? activeTabSongs[0] : {};
      dispatch(modifyCurrentSong(firstSong?.id));
      setCurrentSongData(firstSong);
    }
  };

  const handlePlayAudio = (action = "play") => {
    let audio = audioRef.current;
    let player = playerRef.current;

    switch (action) {
      case "play": {
        audio.play();
        setIsPlaying(true);
        if (audio.play()) {
          INTERVAL = setInterval(() => {
            player.value = audio.currentTime;
            if (player.value === audio.duration) {
              clearInterval(INTERVAL);
              setIsPlaying(false);
              audio.pause();
            }
          }, 500);
        }
        break;
      }
      case "pause": {
        setIsPlaying(false);
        clearInterval(INTERVAL);
        audio.pause();
        break;
      }
      case "forward": {
        let forwardValue = 5;
        let maxDuration = audioRef.current.duration;
        let currentTime = audioRef.current.currentTime;
        if (currentTime + forwardValue > maxDuration) {
          audioRef.current.currentTime = maxDuration;
          audio.pause();
          clearInterval(INTERVAL);
          setIsPlaying(false);
        } else {
          audioRef.current.currentTime += forwardValue;
        }
        playerRef.current.value = audioRef.current.currentTime;

        break;
      }
      case "rewind": {
        let rewindValue = 5;
        let currentTime = audioRef.current.currentTime;
        if (currentTime - rewindValue < 0) {
          audio.currentTime = 0;
        } else {
          audio.currentTime -= rewindValue;
        }
        playerRef.current.value = audioRef.current.currentTime;
        break;
      }
    }
  };

  const handlePlayer = () => {
    if (audioRef.current && playerRef.current) {
      setIsPlaying(false);
      playerRef.current.max = audioRef.current.duration;
      playerRef.current.value = audioRef.current.currentTime;
    }
  };

  const hadnleSeekAudio = (e) => {
    audioRef.current.currentTime = playerRef.current.value;
    handlePlayAudio("play");
  };

  //useEffects
  useEffect(() => {
    if (songCollections) {
      fetchFirstCurrentSong();
    }
  }, [songCollections]);

  return (
    <div className={styles.playerContainer}>
      <section>
        <div className={styles.songInfo}>
          <span>{currentSongData?.name}</span>
          <span>{currentSongData?.artist}</span>
        </div>
        <div className={styles.songPoster}>
          <img src={`${BASE_URL}/assets/${currentSongData?.cover}`} />
        </div>
        <div className={styles.audioControllers}>
          <audio
            id="audioSrc"
            ref={audioRef}
            src={currentSongData?.url}
            onLoadedMetadata={handlePlayer}
          />
          <input
            type="range"
            id="player"
            ref={playerRef}
            onChange={(e) => hadnleSeekAudio(e)}
          />
          <div className={styles.playerControllers}>
            <span
              onClick={() => {
                handlePlayAudio("rewind");
              }}
            >
              <FastRewindRounded />
            </span>
            <span
              onClick={() => {
                handlePlayAudio(!isPlaying ? "play" : "pause");
              }}
            >
              {!isPlaying ? <PlayCircleFilledRounded /> : <PauseCircle />}
            </span>
            <span
              onClick={() => {
                handlePlayAudio("forward");
              }}
            >
              <FastForwardRounded />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(({ currentSong }) => ({
  currentSongId: currentSong.currentSongId || "",
  currentTab: currentSong.currentTab || "",
}))(CurrentSong);
