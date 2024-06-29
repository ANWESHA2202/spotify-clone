//hooks import
import { useContext } from "react";
//context import
import { SpotifyContext } from "@/modules/Spotify";
//styles import
import styles from "@/modules/spotify.module.scss";
//ui components from lib
import { InputAdornment, TextField } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";

let DEBOUNCE = null;

const Search = ({ filterCollectionForTab = () => {} }) => {
  //access states
  const { songCollections } = useContext(SpotifyContext);

  const handleSearching = async (searchValue = "") => {
    if (DEBOUNCE) clearTimeout(DEBOUNCE);
    DEBOUNCE = setTimeout(() => {
      filterCollectionForTab(songCollections, searchValue);
    }, 300);
  };

  return (
    <TextField
      className={styles.searchField}
      placeholder="Search Song, Artist"
      onChange={(e) => handleSearching(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchRounded />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
