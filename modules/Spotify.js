//styles import
import styles from "./spotify.module.scss";
//ui components
import Profile from "./Profile/Profile";
import SongCollection from "./SongCollection/SongCollection";

const Spotify = () => {
  return (
    <div className={styles.spotifyContainer}>
      <Profile />
      <SongCollection />
    </div>
  );
};

export default Spotify;
