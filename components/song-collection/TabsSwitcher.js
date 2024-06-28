//import hooks
import { connect, useDispatch } from "react-redux";
//styles import
import styles from "@/modules/spotify.module.scss";
//redux actions
import { switchCurrentTab } from "../redux/slices/currentSongSlice";
//utility functions
import { tabs } from "../utils/utilities";

const TabsSwitcher = ({ currentTab }) => {
  //define hook instances
  const dispatch = useDispatch();

  //handler functions
  /**
   *
   * @param {string} tab denotes the current tab user wants to switch
   */
  const handleTabSwitch = (tab = "") => {
    if (currentTab !== tab) {
      dispatch(switchCurrentTab(tab));
    }
  };

  return (
    <div className={styles.tabsHeader}>
      {Object.keys(tabs).map((tab, idx) => {
        return (
          <span
            key={idx}
            className={tab !== currentTab && styles.inactive}
            onClick={() => handleTabSwitch(tab)}
          >
            {tabs[tab]}
          </span>
        );
      })}
    </div>
  );
};

export default connect(({ currentSong }) => ({
  currentTab: currentSong.currentTab,
}))(TabsSwitcher);
