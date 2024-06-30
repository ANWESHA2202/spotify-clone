import styles from "@/modules/spotify.module.scss";
import { Skeleton } from "@mui/material";

const CollectionsSkeleton = () => {
  return (
    <div className={styles.collectionsSkeleton}>
      {[1, 1, 1, 1, 1]?.map((arr) => {
        return (
          <div>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
          </div>
        );
      })}
    </div>
  );
};

export default CollectionsSkeleton;
