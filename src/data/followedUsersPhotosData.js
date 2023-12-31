import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import useUserData from "./currentUserData";

export default function useFollowedPhotosData() {
  const currentUserData = useUserData();
  const [data, setData] = useState([]);
  const [loading , setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "users") , orderBy("dateCreated" , "desc"));
    onSnapshot(q, (querySnapshot) => {
      const photosData = [];
      querySnapshot.forEach((doc) => {
        photosData.push({...doc.data()});
      });
      setData(photosData);
      setLoading(false);
    });
      } catch (error) {
        console.log("Error Fetching Data" ,error)
      }
    }
   fetchData();
  }, []);
  const filteredData = data.filter((item) => item.userId !== currentUserData.userId && currentUserData.following && currentUserData.following.includes(item.userId));
  const photosData= filteredData.map((item) => {
    return item.imageSrc.sort()
  })
  return {photosData,loading};
}






























