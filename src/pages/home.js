import React, { useEffect } from "react";
import Feed from "../components/feed";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import useUserData from "../data/currentUserDataWithLoading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function  Home(){
    const {currentUserData , isLoading} = useUserData();

useEffect(()=>{
    document.title = "Dashboared - InstaC";
})


    return (
        !isLoading ? 
        <div>
            <Header currentUserData={currentUserData} />
            <div className="
        max-h-full
        h-screen
        overflow-auto
        w-screen
        bg-gradient-to-r from-sky-500 to-red-500
        transition-transform
        ease-out
        delay-70
        duration-300
        flex
        items-center
        max-w-screen
        flex-wrap
        ">
           <Feed />
           <Sidebar />
           </div>
        </div> : <header>
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
          </div>
          
      </div>
      </SkeletonTheme>
    </header>
    )
}