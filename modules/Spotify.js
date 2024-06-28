//styles import
import Profile from "./Profile/Profile";
import styles from "./spotify.module.scss";

const Spotify = () => {
  return (
    <div className={styles.spotifyContainer}>
      <Profile />
    </div>
  );
};

export default Spotify;
