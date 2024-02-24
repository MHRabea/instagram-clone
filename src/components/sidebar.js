import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { AuthContext } from "../context/authcontext";
import Suggested from "./suggested";
import CurrentUser from "./currentUser";
import { v4 as uuidv4 } from "uuid";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Sidebar() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({ Loading: true });

  useEffect(() => {
    if (currentUser.Loading) {
      return;
    }
    onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      setUserData(doc.data());
    });
  }, [currentUser]);

  return (
    <div
      className="
      container
      px-7
      flex
      flex-col
      basis-1/4
      h-full
      w-full
      items-center  overflow-x-scroll
    "
    >
      {!userData.Loading ? (
        <CurrentUser
          userName={userData.userName}
          fullName={userData.displayName}
          userId={userData.userId}
          photoURL={userData.photoURL}
          following={userData.following}
          key={uuidv4()}
        />
      ) : (
        <SkeletonTheme baseColor="#df3b3b" highlightColor="#ddb1b1">
          <div
            className="flex flex-col  mb-5
        inset-x-0
        top-0
        w-full
        px-3
        border-b-2
        border-b-indigo-900
        hover:border-sky-50
        transition
        ease-in-out
        duration-100
        items-center
        justify-center overflow-auto
        "
          >
            <Skeleton
              animation="wave"
              className="w-12 h-12 rounded-full flex"
            />
            <div className="flex flex-col items-center">
              <Skeleton
                animation="wave"
                className="w-20 h-3 rounded-full flex"
              />
              <Skeleton
                animation="wave"
                className="w-14 h-3 rounded-full flex"
              />
            </div>
          </div>
        </SkeletonTheme>
      )}
      {!userData.Loading ? (
        <Suggested
          userId={userData.userId}
          following={userData.following}
          key={uuidv4()}
        />
      ) : (
        <SkeletonTheme baseColor="#df3b3b" highlightColor="#ddb1b1 ">
          <Skeleton count={1} className="mb-4 w-32 h-3" />
          <div className="flex items-center space-x-8">
            <div className="flex flex-col justify-center items-center">
              <Skeleton count={1} className=" mb-3 rounded-full w-14 h-14" />
              <Skeleton count={1} className="mb-4 w-28 h-3" />
              <Skeleton count={1} className="mb-4 w-20 h-3" />
            </div>
            <div className="flex">
              <Skeleton count={1} className="mb-4 w-16 h-5" />
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex flex-col justify-center items-center">
              <Skeleton count={1} className=" mb-3 rounded-full w-14 h-14" />
              <Skeleton count={1} className="mb-4 w-28 h-3" />
              <Skeleton count={1} className="mb-4 w-20 h-3" />
            </div>
            <div className="flex">
              <Skeleton count={1} className="mb-4 w-16 h-5" />
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex flex-col justify-center items-center">
              <Skeleton count={1} className=" mb-3 rounded-full w-14 h-14" />
              <Skeleton count={1} className="mb-4 w-28 h-3" />
              <Skeleton count={1} className="mb-4 w-20 h-3" />
            </div>
            <div className="flex">
              <Skeleton count={1} className="mb-4 w-16 h-5" />
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex flex-col justify-center items-center">
              <Skeleton count={1} className=" mb-3 rounded-full w-14 h-14" />
              <Skeleton count={1} className="mb-4 w-28 h-3" />
              <Skeleton count={1} className="mb-4 w-20 h-3" />
            </div>
            <div className="flex">
              <Skeleton count={1} className="mb-4 w-16 h-5" />
            </div>
          </div><div className="flex items-center space-x-8">
            <div className="flex flex-col justify-center items-center">
              <Skeleton count={1} className=" mb-3 rounded-full w-14 h-14" />
              <Skeleton count={1} className="mb-4 w-28 h-3" />
              <Skeleton count={1} className="mb-4 w-20 h-3" />
            </div>
            <div className="flex">
              <Skeleton count={1} className="mb-4 w-16 h-5" />
            </div>
          </div>
        </SkeletonTheme>
      )}
    </div>
  );
}

export default Sidebar;
