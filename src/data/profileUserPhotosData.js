import { db } from "../firebase/config";
import {
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function useProfileUserPhotos(username) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileUserPhotos, setProfileUserPhotos] = useState([]);

  useEffect(() => {
    const returnUserByUsername = async () => {
      try {
        const q = query(
          collection(db, "photos"),
          where("displayName", "==", username)
        );
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => data.push(doc.data()));
        setProfileUserPhotos(data);
        setIsLoading(false);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    returnUserByUsername();
  }, [username]);

  return { profileUserPhotos, isLoading };
}
