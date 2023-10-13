import { query, collection ,getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import useUserData from "./currentUserData";

export default function useUnfollowedUsersData() {
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
  const unfollowedUsers =  data.filter(item => item.userId !== currentUserData.userId && currentUserData.following && !currentUserData.following.includes(item.userId));
  
  return {unfollowedUsers  , loading }
}

