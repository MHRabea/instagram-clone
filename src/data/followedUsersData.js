import { query, collection ,getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import useUserData from "./currentUserData";

export default function useFollowedUsersData() {
  const currentUserData = useUserData();
  const [data, setData] = useState([]);
  const [loading , setLoading] = useState(true);
  useEffect(() => {
const fetchData = async () => {
  try {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q)
    const usersData = []
     querySnapshot.forEach((doc) => {
      usersData.push(doc.data());
     })
      setData(usersData);
      setLoading(false)

  }catch(error){
    console.log("error" , error)
  }
}
fetchData();
  },[]);
  const followedUsers =  data.filter(item => item.userId !== currentUserData.userId && currentUserData.following && currentUserData.following.includes(item.userId));
  const followedUsersLikedPhotos = followedUsers.map((followedUser) => {
    const likedPhoto = followedUser.likes.includes(currentUserData.userId)
    return {...followedUser , likedPhoto}
  })
  return {followedUsers : followedUsersLikedPhotos , loading }
}

