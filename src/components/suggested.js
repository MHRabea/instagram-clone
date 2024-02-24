import {
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import useUnfollowedUsersData from "../data/unfollowedUsersData";
import useUserData from "../data/currentUserData";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

export default function Suggested({ following }) {
  const { unfollowedUsers, loading } = useUnfollowedUsersData();
  const currentUserData = useUserData();

  if (loading) {
    return;
  }

  async function handleFollowing() {
    const buttonValue = document.getElementById("button").value;
    const userRef = doc(db, "users", currentUserData.userId);
    await updateDoc(userRef, {
      following: arrayUnion(buttonValue)
    });
    const followedRef = doc(db, 'users', buttonValue);
    await updateDoc(followedRef, {
      followers: arrayUnion(currentUserData.userId)
    });

  }
  return (
    <div className="flex md:flex-col items-center justify-center w-full border-t-2 
    border-black md:border-t-0 overflow-x-hidden overflow-y-hidden md:overflow-y-visible ">

    <div
      className=" flex md:flex-col items-end md:items-center md:border-l 
      space-y-4 justify-center md:justify-normal overflow-x-scroll relative space-x-5 w-full 
        "
    >
      <div className="absolute top-1 flex items-center justify-center md:static  ">Suggested For You <MdKeyboardDoubleArrowUp size={20} className="md:hidden animate-bounce"/></div>
      {unfollowedUsers.map((unfollowedUser) => {
        return (
          <div
            key={unfollowedUser.displayName}
            className="flex md:space-x-4 w-full  items-center pb-3 justify-center flex-col"
          >
            <Link
              to={`/p/${unfollowedUser.displayName}`}
              className="flex items-center mb-5 mt-5 mx-auto flex-col transition ease-in-out
              hover:scale-110"
            >
              <img
                src={unfollowedUser.photoURL}
                alt="user img"
                className="transition ease-in-out rounded-full w-14 h-14
                "
              />
              <div className="flex flex-col items-center text-xs">
                <p className="transition ease-in-out font-bold">
                  {unfollowedUser.userName}
                </p>
                <p className="transition ease-in-out text-xs pl-2 mb-2">
                  {unfollowedUser.displayName}
                </p>
              </div>
            </Link>
            <button
              id="button"
              value={unfollowedUser.userId}
              onClick={handleFollowing}
              type="button"
              className="transition ease-in-out hover:scale-125 flex cursor-pointer 
              shadow-lg px-4 hover:shadow-2xl mb-3">
              follow
            </button>
          </div>
        );
      })}
    </div>
    </div>
  );
}
