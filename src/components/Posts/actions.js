import { useState } from "react";
import useUserData from "../../data/currentUserData";
import { db } from "../../firebase/config";
import { doc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";

export default function Actions({
  totalLikes,
  likedPhoto,
  handleFocus,
  userId,
}) {
  const [liked, setLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const currentUserData = useUserData();

  const handleLiked = async () => {
    setLiked((liked) => !liked);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      likes: liked
        ? arrayRemove(currentUserData.userId)
        : arrayUnion(currentUserData.userId),
    });
    setLikes((likes) => (liked ? likes - 1 : likes + 1));
  };

  return (
    <div className="items-center w-full transition ease-in-out bg-gradient-to-r from-sky-400 to-red-500">
      <div className="py-2 px-2 w-full flex items-center space-x-2">
        <svg
          onClick={handleLiked}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLiked();
            }
          }}
          fill="none"
          stroke="currentColor"
          tabIndex={0}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          className={`  w-8 h-8 transition ease-in-out hover:scale-125 select-none cursor-pointer focus:outline-none ${
            liked
              ? "fill-rose-600 text-red-primary animate-pingp duration-75  ease-in-out transition"
              : "fill-transparent"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <svg
        onClick={handleFocus}
        onKeyDown={(e) => {
          if (e.key === "Enter"){
            handleFocus();
          }
        }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className="w-6 h-6 transition ease-in-out hover:scale-125 select-none cursor-pointer focus:outline-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
      </div>
      <div className="px-2 items-center text-sm">
        <p>{likes === 1 ? likes + " like" : likes + " likes"}</p>
      </div>
    </div>
  );
}
