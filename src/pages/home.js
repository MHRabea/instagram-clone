import React, { useEffect } from "react";
import Feed from "../components/feed";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function  Home(){

useEffect(()=>{
    document.title = "Dashboared - InstaC";
})


    return (
        <div>
            <Header />
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
        ">
           <Feed />
           <Sidebar />
           </div>
        </div>
    )
}