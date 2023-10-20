import { db } from "../firebase/config";
import {
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function useProfileUser(username) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileUserData, setProfileUserData] = useState([]);

  useEffect(() => {
    const returnUserByUsername = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("displayName", "==", username)
        );
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => data.push(doc.data()));
        setProfileUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    returnUserByUsername();
  }, [username]);


  return { profileUserData, isLoading };
}
