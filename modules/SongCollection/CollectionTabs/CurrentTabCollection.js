//import style
import styles from "@/modules/spotify.module.scss";
//ui components
import SongRow from "@/components/song-collection/SongRow";

const CurrentTabCollection = ({ collection = [] }) => {
  return (
    <div className={styles.currentCollections}>
      {collection?.map((songData, idx) => {
        return <SongRow key={idx} songData={songData} />;
      })}
    </div>
  );
};

export default CurrentTabCollection;
