import { useState, useEffect, useContext } from "react";
import {
  query,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  orderBy,
} from "firebase/firestore";
import { AuthContext } from "../context/authcontext";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "react-loading-skeleton/dist/skeleton.css";

export default function Suggested({ following }) {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("displayName", "asc"));
    onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
        setData(usersData);
      });
    });
  }, []);

  async function handleFollowing(){
    const buttonValue = document.getElementById("button").value;
    const userRef = doc(db, "users" , currentUser.uid);
    await updateDoc(userRef, {
      following: arrayUnion(buttonValue)
    })
    const followedRef = doc(db , 'users' , buttonValue)
    await updateDoc(followedRef, {
      followers: arrayUnion(currentUser.uid)
    })

  }

  if (currentUser.Loading) {
    return;
  }

  let value = currentUser.uid;
  const filteredData = data.filter((item) => {
    return item.userId !== value;
  });
  const filteredFollowings = filteredData.filter(
    (itom) => !following.includes(itom.userId)
  );
  return (
    <div
      className="
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
      {filteredFollowings.map((dataItem) => {
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
              to={`/p/${dataItem.fullName}`}
              className="flex items-center mb-5 mt-5 mx-auto flex-col
          transition
        ease-in-out
        hover:scale-110
          "
            >
              <img
                src={dataItem.photoURL}
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
                  {dataItem.userName}
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
                  {dataItem.displayName}
                </p>
              </div>
            </Link>
            <button
            id="button"
            value={dataItem.userId}
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
