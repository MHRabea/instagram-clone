import useFollowedUsersData from "../data/followedUsersData";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import Post from "./Posts/post";

export default function Feed() {
  const { followedUsers, loading } = useFollowedUsersData();


  return (
    <div className="basis-3/4 px-10 overflow-auto  overflow-x-hidden h-full max-h-full rounded-sm items-center flex flex-col w-full">
      {!loading ?(
        followedUsers.map(followedUser => (
          <Post followedUser={followedUser} key={followedUser.userId}  />
        ))

      ) : (
        <SkeletonTheme baseColor="#df3b3b" highlightColor="#ddb1b1">
          <div className="flex items-center justify-center flex-col p-4">
            <Skeleton className="h-96 w-96 mb-4" animation="wave" />
            <Skeleton className="h-96 w-96 mb-4" animation="wave" />
            <Skeleton className="h-96 w-96 mb-4" animation="wave" />
            <Skeleton className="h-96 w-96 mb-4" animation="wave" />
            <Skeleton className="h-96 w-96 mb-4" animation="wave" />
            <Skeleton className="h-96 w-96 mb-4" animation="wave" />
            <Skeleton className="h-96 w-96 mb-4" animation="wave" />
          </div>
        </SkeletonTheme>
      )}

    </div>
  );
}
