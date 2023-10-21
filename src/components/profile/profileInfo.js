import { useState, useEffect } from "react";
import useFollowedUsersData from "../../data/followedUsersData";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/config";
import PostWindow from "./postWindow";

export default function ProfileInfo({
  profileUserData,
  profile,
  followerCount,
  photosCount,
  dispatch,
  username,
  loggedInUser,
  following
}) {
  const disabledButton = loggedInUser.displayName === username;

  var [isFollowed, setIsFollowed] = useState(false);

  const { followedUsers, loading } = useFollowedUsersData();

  useEffect(() => {
    if (!loading) {
      const isUserFollowed = followedUsers.find(
        (followedUser) => followedUser.userId === profileUserData.userId
      );
      setIsFollowed(!!isUserFollowed);
    }
   // eslint-disable-next-line
  }, [profileUserData , loading]);

    const handleFollow = async () => {

    const updatedButtonState = !isFollowed;
    setIsFollowed(updatedButtonState);

    dispatch({
      followerCount: updatedButtonState ? followerCount + 1 : followerCount - 1,
    });


    try {
      const buttonValue = document.getElementById("followbutton").value;
      const userRef = doc(db, "users", loggedInUser.userId);
      await updateDoc(userRef, {
        following: updatedButtonState ? arrayUnion(buttonValue) : arrayRemove(buttonValue),
      });
      const followedRef = doc(db, "users", buttonValue);
      await updateDoc(followedRef, {
        followers: updatedButtonState ? arrayUnion(loggedInUser.userId) : arrayRemove(loggedInUser.userId),
      });
    } catch (error) {
      console.log("error updatiog follow status ", error);
      setIsFollowed(!updatedButtonState);
      dispatch({
        followerCount: isFollowed ? followerCount - 1 : followerCount + 1,
      });
    }
  };

  return (
    <div className="items-center flex py-10 space-x-5">
      <div className="container flex space-x-10">
        <img
          src={profileUserData.photoURL}
          alt="profilePhoto"
          className="w-40 h-40 rounded-full"
        />
        <div className="flex flex-col space-y-5">
          <div className="flex space-x-5">
            <span className="font-bold">{profileUserData.userName}</span>
            <button
              id="followbutton"
              value={profileUserData.userId}
              onClick={handleFollow}
              disabled={disabledButton}
              style={
                disabledButton
                  ? { opacity: "0.5", display: "none" }
                  : { opacity: "1" }
              }
              className=" transition
        ease-in-out
        hover:scale-125
        flex cursor-pointer shadow-lg px-4 hover:shadow-2xl mb-3"
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="flex space-x-5">
            <p className="flex flex-col items-center font-bold">
              <span className="text-gray-100">Followers</span>
              <span>{followerCount}</span>
            </p>{" "}
            <p className="flex flex-col items-center font-bold">
              <span className="text-gray-100">posts</span>
              <span>{photosCount}</span>
            </p>{" "}
            <p className="flex flex-col items-center font-bold">
              <span className="text-gray-100">following</span>
              <span>{following}</span>
            </p>
          </div>
          <div className="flex">
            <span className="font-bold">{profileUserData.displayName}</span>
          </div>
        </div>
      </div>
      {disabledButton && <PostWindow />}
    </div>
  );
}
