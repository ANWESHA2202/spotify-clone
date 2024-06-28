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
