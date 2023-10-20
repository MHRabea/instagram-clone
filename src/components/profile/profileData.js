import { useReducer, useEffect } from "react";
import ProfileHeader from "./profieHeader";
import ProfilePhotos from "./profilePhotos";
import ProfileInfo from "./profileInfo";

export default function ProfileData({
  profileUserData,
  username,
  loggedInUser,
}) {
  const reducer = (state, newState) => ({ ...state, ...newState });

  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  
  useEffect(() => {
    function fetchProfileInfo() {
      dispatch({
        profile: profileUserData.userName,
        photosCollection: profileUserData.imageSrc,
        followerCount: profileUserData.followers.length,
      });
    }
    fetchProfileInfo();
  }, [profileUserData]);

  return (
    <div>
      <ProfileHeader profileUserData={profileUserData} />
      <div className="flex  flex-col items-center ">
        <ProfileInfo
          loggedInUser={loggedInUser}
          username={username}
          profileUserData={profileUserData}
          profile={profile}
          followerCount={followerCount}
          following={profileUserData.following.length}
          photosCount={photosCollection ? photosCollection.length : 0}
          dispatch={dispatch}
        />
        <ProfilePhotos photos={photosCollection} likes ={profileUserData.likes.length} comments ={profileUserData.comments.length} caption ={profileUserData.likes.caption} />
      </div>
    </div>
  );
}
