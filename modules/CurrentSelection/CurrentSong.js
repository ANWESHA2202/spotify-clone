//hooks import
import { connect, useDispatch } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";
import { Skeleton, useMediaQuery } from "@mui/material";
//import styles
import styles from "@/modules/spotify.module.scss";
//context
import { SpotifyContext } from "../Spotify";
import {
  modifyCurrentSong,
  removeFromPreviousStack,
} from "@/components/redux/slices/currentSongSlice";
//ui components from lib
import {
  ArrowBackIosRounded,
  FastForwardRounded,
  FastRewindRounded,
  MoreHorizRounded,
  PauseCircle,
  PlayCircleFilledRounded,
  VolumeUpRounded,
} from "@mui/icons-material";
import { BASE_URL } from "@/components/utils/fetcher";
//utility functions
import {
  findNextSongOfActiveTab,
  findPrevSongOfActiveTab,
} from "@/components/utils/utilities";
import Profile from "../Profile/Profile";

//global variable
let INTERVAL = null;

const CurrentSong = ({ currentSongId, currentTab, previousSongStack }) => {
  //hooks instances
  const dispatch = useDispatch();
  const matches = useMediaQuery("@media (max-width: 800px)");

  const audioRef = useRef(null);
  const playerRef = useRef(null);
  //access states
  const { currentSongData, setCurrentSongData, songCollections } =
    useContext(SpotifyContext);

  //define states
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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

  const handleBack = () => {
    if (!matches) return;
    let ele = document.getElementById("songCollectionsContainer");
    let eleToHide = document.getElementById("playerContainer");
    ele.style.width = "100%";
    eleToHide.classList.add(styles.inactive);
    ele.classList.remove(styles.inactive);
    eleToHide.style.width = 0;
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
      case "next": {
        let nextSong = findNextSongOfActiveTab(
          currentSongId,
          songCollections,
          currentTab
        );
        dispatch(modifyCurrentSong(nextSong?.id));
        setCurrentSongData(nextSong);
        break;
      }
      case "previous": {
        let prevSong = findPrevSongOfActiveTab(
          previousSongStack,
          currentSongId,
          songCollections,
          currentTab
        );
        dispatch(modifyCurrentSong(prevSong?.id));
        dispatch(removeFromPreviousStack());
        setCurrentSongData(prevSong);
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

  const handleSeekAudio = (e) => {
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
    <div className={styles.playerContainer} id="playerContainer">
      <section>
        <div className={styles.songInfo}>
          <span onClick={() => handleBack()}>
            {matches ? <ArrowBackIosRounded /> : null}
            {currentSongData?.name}
          </span>
          <span>{currentSongData?.artist}</span>
        </div>
        <div className={styles.songPoster}>
          <img
            src={`${BASE_URL}/assets/${currentSongData?.cover}`}
            onLoad={() => setIsImageLoaded(true)}
            style={{ width: !isImageLoaded && 0, height: !isImageLoaded && 0 }}
          />
          {!isImageLoaded ? (
            <Skeleton variant="rectangle" height={200} width={200} />
          ) : null}
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
            onChange={(e) => handleSeekAudio(e)}
          />
          <div className={styles.playerControllers}>
            <span className={styles.cornerIcons}>
              <MoreHorizRounded />
            </span>
            <div>
              <span
                onClick={() => {
                  handlePlayAudio("previous");
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
                  handlePlayAudio("next");
                }}
              >
                <FastForwardRounded />
              </span>
            </div>
            <span className={styles.cornerIcons}>
              <VolumeUpRounded />
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
  previousSongStack: currentSong.previousSongStack || [],
}))(CurrentSong);
