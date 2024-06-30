//import style
import styles from "@/modules/spotify.module.scss";
//ui components
import SongRow from "@/components/song-collection/SongRow";
import NoSongs from "@/components/song-collection/NoSongs";
import CollectionsSkeleton from "@/components/song-collection/CollectionsSkeleton";

const CurrentTabCollection = ({ collection = [], isFetching = true }) => {
  return (
    <div className={styles.currentCollections}>
      {collection?.map((songData, idx) => {
        return <SongRow key={idx} songData={songData} />;
      })}
      {!collection?.length && !isFetching ? <NoSongs /> : null}
      {isFetching ? <CollectionsSkeleton /> : null}
    </div>
  );
};

export default CurrentTabCollection;
