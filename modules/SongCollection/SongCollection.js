//hooks import
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { connect } from "react-redux";
//context import
import { SpotifyContext } from "../Spotify";
//styles import
import styles from "../spotify.module.scss";
//ui components
import CurrentTabCollection from "./CollectionTabs/CurrentTabCollection";
import Search from "@/components/song-collection/Search";
import TabsSwitcher from "@/components/song-collection/TabsSwitcher";
//utility functions
import fetcher from "@/components/utils/fetcher";
import { scrollIntoView } from "@/components/utils/utilities";

const SongCollection = ({ currentTab, currentSongId }) => {
  //hook instances
  const matches = useMediaQuery("@media (max-width: 800px)");

  //access states
  const { songCollections, setSongCollections } = useContext(SpotifyContext);
  const [filteredCollections, setFilteredCollection] = useState([]);

  //api callers
  const fetchSongs = async () => {
    try {
      const { data, status } = await fetcher("items/songs");
      if (status === 200) {
        setSongCollections(data?.data);
        filterCollectionForTab(data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //helper functions

  /**
   *
   * @param {Array} collections represents the all songs collection
   * @param {string} searchValue represents the song/artist user wants to search for
   * this function is responsible to filter the data according to active tab and search value both
   */
  const filterCollectionForTab = (
    collections = songCollections,
    searchValue = ""
  ) => {
    let filteredData = [];

    if (searchValue?.length) {
      filteredData = collections?.filter(
        (song) =>
          song?.artist?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
          song?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
      );
    } else {
      filteredData = collections?.filter((song) => {
        if (currentTab === "foryou") {
          return true;
        } else {
          return song?.top_track === true;
        }
      });
    }
    setFilteredCollection(filteredData);
  };

  //useEffects
  useEffect(() => {
    fetchSongs();
  }, []);
  useEffect(() => {
    filterCollectionForTab();
  }, [currentTab]);
  useEffect(() => {
    if (currentSongId && !matches) {
      scrollIntoView(`song${currentSongId}`);
    }
  }, [currentSongId]);

  //component return
  return (
    <div
      className={styles.songCollectionsContainer}
      id="songCollectionsContainer"
    >
      <TabsSwitcher />
      <Search filterCollectionForTab={filterCollectionForTab} />
      <CurrentTabCollection collection={filteredCollections} />
    </div>
  );
};

export default connect(({ currentSong }) => ({
  currentTab: currentSong.currentTab || "",
  currentSongId: currentSong.currentSongId || "",
}))(SongCollection);
