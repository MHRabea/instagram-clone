import React, { useEffect } from "react";

export default function  NotFound(){

    useEffect(()=>{
        document.title = "Not Found - InstaC";
    })
    return (
        <div className="
        h-screen
        transition-transform
        ease-out
        delay-70
        duration-300
        animate-ping
        flex
        justify-center
        items-center
        w-full
        ">Not Found</div>
    )
}

