import {
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import useUnfollowedUsersData from "../data/unfollowedUsersData";
import useUserData from "../data/currentUserData";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "react-loading-skeleton/dist/skeleton.css";

export default function Suggested({ following }) {
  const {unfollowedUsers, loading } = useUnfollowedUsersData()
  const currentUserData = useUserData()

  if(loading){
    return
  }

  async function handleFollowing(){
    const buttonValue = document.getElementById("button").value;
    const userRef = doc(db, "users" , currentUserData.userId);
    await updateDoc(userRef, {
      following: arrayUnion(buttonValue)
    })
    const followedRef = doc(db , 'users' , buttonValue)
    await updateDoc(followedRef, {
      followers: arrayUnion(currentUserData.userId)
    })

  }
  return (
    <div
      className="
      container
          mx-auto
          flex
          flex-col
          items-center
          px-7
          w-full
          border-l
          py-5
          space-y-4 
        "
    >
      <div>Suggested For You</div>
      {unfollowedUsers.map((unfollowedUser) => {
        return (
          <div
            key={uuid()}
            className="flex
            space-x-4
            w-full
        mx-auto
        items-center
        pb-3
      "
          >
            <Link
              to={`/p/${unfollowedUser.displayName}`}
              className="flex items-center mb-5 mt-5 mx-auto flex-col
          transition
        ease-in-out
        hover:scale-110
          "
            >
              <img
                src={unfollowedUser.photoURL}
                alt="user img"
                className="
                transition
                ease-in-out
                rounded-full
                w-14
                h-14
                "
              />
              <div
                className="flex
          flex-col
          items-center
          text-xs
          "
              >
                <p
                  className="
            transition
            ease-in-out
            font-bold
            "
                >
                  {unfollowedUser.userName}
                </p>
                <p
                  className="
            transition
            ease-in-out
            text-xs
            pl-2
            mb-2
              "
                >
                  {unfollowedUser.displayName}
                </p>
              </div>
            </Link>
            <button
            id="button"
            value={unfollowedUser.userId}
            onClick={handleFollowing}
              type="button"
              className="
        transition
        ease-in-out
        hover:scale-125
        flex cursor-pointer shadow-lg px-4 hover:shadow-2xl mb-3"
            >
              follow
            </button>
          </div>
        );
      })}
    </div>
  );
}
