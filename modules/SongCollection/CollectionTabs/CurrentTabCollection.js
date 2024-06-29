//import style
import styles from "@/modules/spotify.module.scss";
//ui components
import SongRow from "@/components/song-collection/SongRow";
import NoSongs from "@/components/song-collection/NoSongs";

const CurrentTabCollection = ({ collection = [] }) => {
  return (
    <div className={styles.currentCollections}>
      {collection?.map((songData, idx) => {
        return <SongRow key={idx} songData={songData} />;
      })}
      {!collection?.length ? <NoSongs /> : null}
    </div>
  );
};

export default CurrentTabCollection;
