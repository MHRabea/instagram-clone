import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as ROUTES from "../components/routes";
import ProfileData from "../components/profile/profileData";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useProfileUser from "../data/profileUserData";
import useUserData from "../data/currentUserData";

export default function Profile() {
  const { username } = useParams();
  const { profileUserData, isLoading } = useProfileUser(username);
  const currentUser = useUserData();

  const Navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      if (profileUserData) {
      } else {
        Navigate(ROUTES.Not_Found);
      }
    }
    checkUser();
  }, [Navigate, profileUserData, username]);

  return !isLoading ? (
    <div className="bg-gradient-to-r from-sky-500 to-red-500 w-screen max-w-screen h-screen max-h-full overflow-scroll">
      <ProfileData
        loggedInUser={currentUser}
        username={username}
        profileUserData={profileUserData[0]}
      />
    </div>
  ) : (
    <header>
      <SkeletonTheme baseColor="#df3b3b" highlightColor="#ddb1b1">
        <div
          className=" lg:px-6 py-2.5
             bg-gradient-to-r
             from-sky-500 to-red-500
             flex
             flex-row
             items-center
             mx-auto
             max-w-screen
             justify-between
             px-3
             border-b
             "
        >
          <div className="flex items-center space-x-2">
            <Skeleton count={1} className=" w-14 h-14" />
            <div className="flex flex-col">
              <Skeleton count={1} className=" w-14 h-6" />
              <Skeleton count={1} className=" w-14 h-2" />
            </div>
            <Skeleton count={1} className="h-14 w-14 rounded-full" />
          </div>
          <div className="flex space-x-2">
            <Skeleton count={1} className="w-8 h-8" />
            <Skeleton count={1} className="w-8 h-8" />
            <Skeleton count={1} className="w-8 h-8" />
          </div>
        </div>
        <div className="w-screen h-screen max-h-full flex flex-col pt-5 items-center max-w-full bg-gradient-to-r from-sky-500 to-red-500 overflow-scroll space-y-10">
          <div className="items-center flex space-x-5">
            <Skeleton className="w-40 h-40 rounded-full" />
            <div className="flex flex-col items-center space-y-5">
              <div className="flex space-x-3">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-20 h-6" />
              </div>
              <div className="flex  space-x-5">
                <div className="flex flex-col items-center ">
                  <Skeleton count={1} className="w-16 h-4" />
                  <Skeleton count={1} className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-center ">
                  <Skeleton count={1} className="w-16 h-4" />
                  <Skeleton count={1} className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-center ">
                  <Skeleton count={1} className="w-16 h-4" />
                  <Skeleton count={1} className="w-4 h-4" />
                </div>
              </div>
              <div className="flex">
                <Skeleton count={1} className="h-6 w-32"  />
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <Skeleton count={3} className="w-48 h-48 flex"  /> 
            <Skeleton count={3} className="w-48 h-48 flex"  /> 
            <Skeleton count={3} className="w-48 h-48 flex"  /> 
            <Skeleton count={3} className="w-48 h-48 flex"  /> 
            <Skeleton count={3} className="w-48 h-48 flex"  /> 
            <Skeleton count={3} className="w-48 h-48 flex"  /> 
          </div>
        </div>
      </SkeletonTheme>
    </header>
  );
}
