// import useFollowedUsersData from "../data/followedUsersData";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {v4 as uuid} from "uuid";
import usePhotosData from "../data/photosData";

import "react-loading-skeleton/dist/skeleton.css";
import Post from "./Posts/post";

export default function Feed() {
  // const { followedUsers, loading } = useFollowedUsersData();
  const {data , loading} = usePhotosData();

  return (
    <div className=" basis-3/4 px-10 overflow-auto   h-full max-h-full rounded-sm items-center flex flex-col w-full">
      {!loading ? (
        data.map((photo) => (
          <Post photosData ={photo} key={uuid()} />
        ))
      ) : ( 
        <SkeletonTheme baseColor="#df3b3b" highlightColor="#ddb1b1">
          <div className="flex flex-col w-full space-y-2">
            <div className="flex w-full items-center space-x-3">
              <Skeleton
                count={1}
                className=" px-2 rounded-full w-14 h-14 mb-4"
              />
              <Skeleton count={1} className="mb-4 w-36 h-4" />
            </div>
            <div className="flex-col space-y-3">
              <Skeleton count={1} className="w- h-96 " />
              <div className=" px-2 flex space-x-2">
                <Skeleton count={1} className="w-6 h-6 " />
                <Skeleton count={1} className="w-6 h-6 " />
              </div>
              <div className="px-2">
                <Skeleton count={1} className="h-4 w-36" />
                <Skeleton count={1} className="h-4 w-20" />
                <Skeleton count={1} className="h-4 w-28" />
                <Skeleton count={1} className="h-4 w-32" />
                <Skeleton count={1} className="h-4 w-32" />
                <Skeleton count={1} className="h-4 w-32" />
                <Skeleton count={1} className="h-4 w-16" />
                <Skeleton count={1} className="h-4 w-18" />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <div className="flex w-full items-center space-x-3">
              <Skeleton
                count={1}
                className=" px-2 rounded-full w-14 h-14 mb-4"
              />
              <Skeleton count={1} className="mb-4 w-36 h-4" />
            </div>
            <div className="flex-col space-y-3">
              <Skeleton count={1} className="w- h-96 " />
              <div className=" px-2 flex space-x-2">
                <Skeleton count={1} className="w-6 h-6 " />
                <Skeleton count={1} className="w-6 h-6 " />
              </div>
              <div className="px-2">
                <Skeleton count={1} className="h-4 w-36" />
                <Skeleton count={1} className="h-4 w-20" />
                <Skeleton count={1} className="h-4 w-28" />
                <Skeleton count={1} className="h-4 w-32" />
                <Skeleton count={1} className="h-4 w-32" />
                <Skeleton count={1} className="h-4 w-32" />
                <Skeleton count={1} className="h-4 w-16" />
                <Skeleton count={1} className="h-4 w-18" />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <div className="flex w-full items-center space-x-3">
              <Skeleton
                count={1}
                className=" px-2 rounded-full w-14 h-14 mb-4"
              />
              <Skeleton count={1} className="mb-4 w-36 h-4" />
            </div>
            <div className="flex-col space-y-3">
              <Skeleton count={1} className="w- h-96 " />
              <div className=" px-2 flex space-x-2">
                <Skeleton count={1} className="w-6 h-6 " />
                <Skeleton count={1} className="w-6 h-6 " />
              </div>
              <div className="px-2">
                <Skeleton count={1} className="h-4 w-36" />
                <Skeleton count={1} className="h-4 w-20" />
                <Skeleton count={1} className="h-4 w-28" />
                <Skeleton count={1} className="h-4 w-32" />
                <Skeleton count={1} className="h-4 w-32" />
                <Skeleton count={1} className="h-4 w-32" />
                <Skeleton count={1} className="h-4 w-16" />
                <Skeleton count={1} className="h-4 w-18" />
              </div>
            </div>
          </div>
        </SkeletonTheme>
      )}
    </div>
  );
}
