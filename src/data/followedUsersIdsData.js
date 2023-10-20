import { query, collection , getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import useUserData from "./currentUserData";

export default function useFollowedUsersIds() {
  const currentUserData = useUserData();
  const [data, setData] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "users"));
        const snapShot = await getDocs(q)
        const docs = []
        snapShot.forEach(doc => {
          docs.push(doc.data());
        })
        setData(docs)
        setIsLoading(false)
      } catch (error) {
        console.log("Error Fetching Data" ,error)
      }
    }
   fetchData();
  }, []);
  const filteredData = data.filter((item) => item.userId !== currentUserData.userId && currentUserData.following && currentUserData.following.includes(item.userId));
  const idsData= filteredData.map((item) => {
    return item.userId
  })
  return {idsData , isLoading}; 
  
}






























