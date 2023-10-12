import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import useUserData from "./currentUserData";

export default function useUsersData() {
  const currentUserData = useUserData();
  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
      });
      setData(usersData);
    });
  }, []);
  const filteredData = data.filter((item) => item.userId !== currentUserData.userId );
  return filteredData;
}

