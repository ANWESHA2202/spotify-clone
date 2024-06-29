/**
 * this file consists all the minor logic containing utility functions and static data
 */

export const tabs = {
  foryou: "For You",
  toptracks: "Top Tracks",
};

export async function getAudioDuration(audioUrl = "") {
  const audio = new Audio(audioUrl);
  audio.preload = "metadata";

  return new Promise((resolve, reject) => {
    audio.onloadedmetadata = () => {
      const duration = audio.duration; // Duration in seconds

      // Convert duration to "MM:SS" format
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);

      const formattedDuration = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      resolve(formattedDuration);
    };

    audio.onerror = (err) => {
      reject(err);
    };
  });
}

export const findNextSongOfActiveTab = (
  currentSongId = "",
  songCollections = [],
  activeTab = ""
) => {
  let nextSong = {};
  let nextSongs = structuredClone(songCollections)?.filter((song) => {
    if (activeTab === "foryou") {
      return true;
    } else {
      return song?.top_track === true;
    }
  });
  let idxOfCurrentSong = nextSongs?.findIndex(
    (song) => song?.id === currentSongId
  );
  if (idxOfCurrentSong + 1 === nextSongs?.length) {
    nextSong = nextSongs[0];
  } else {
    nextSong = nextSongs[idxOfCurrentSong + 1];
  }
  return nextSong;
};

export const findPrevSongOfActiveTab = (
  currentSongId = "",
  songCollections = [],
  activeTab = ""
) => {
  let prevSong = {};
  let prevSongs = structuredClone(songCollections)?.filter((song) => {
    if (activeTab === "foryou") {
      return true;
    } else {
      return song?.top_track === true;
    }
  });
  let idxOfCurrentSong = prevSongs?.findIndex(
    (song) => song?.id === currentSongId
  );
  if (idxOfCurrentSong - 1 < 0) {
    prevSong = prevSongs[prevSongs.length - 1];
  } else {
    prevSong = prevSongs[idxOfCurrentSong - 1];
  }
  return prevSong;
};
