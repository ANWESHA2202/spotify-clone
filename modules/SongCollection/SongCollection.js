//styles import
import styles from "../spotify.module.scss";
//ui components
import ForYou from "./CollectionTabs/ForYou";
import Search from "@/components/song-collection/Search";
import TabsSwitcher from "@/components/song-collection/TabsSwitcher";
import TopTracks from "./CollectionTabs/TopTracks";

const SongCollection = () => {
  //ui renderer function
  const renderTabContent = () => {
    let currentTab = "toptracks";
    switch (currentTab) {
      case "foryou":
        return <ForYou />;
      case "toptracks":
      default:
        return <TopTracks />;
    }
  };

  //component return
  return (
    <div>
      <TabsSwitcher />
      <Search />
      {renderTabContent()}
    </div>
  );
};

export default SongCollection;
