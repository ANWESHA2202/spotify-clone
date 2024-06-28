import Logo from "@/components/Logo";
import Image from "next/image";
import styles from "../spotify.module.scss";

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <Logo />
      <Image src={"Guest_Profile.svg"} width={35} height={35} />
    </div>
  );
};

export default Profile;
