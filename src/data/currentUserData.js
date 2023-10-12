import { useContext, useEffect, useState } from "react";
import { doc ,getDoc} from "firebase/firestore";
import { AuthContext } from "../context/authcontext";
import { db } from "../firebase/config";



export default function useUserData() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (currentUser.Loading) {
      return;
    }

    const fetchData = async () => {
      const docRef = doc(db, 'users' , currentUser.uid);
      try {
        const snapshot = await getDoc(docRef);
        if(snapshot.exists()){
          setUserData(snapshot.data())
        }
      } catch (error) {
        console.log( 'error fetching data' ,error)
      }
    }
    fetchData();
    return () => {
      //cleanUp function 
    }
  }, [currentUser]);

  return userData; 

}


//  useEffect(() => {
//   if (currentUser.Loading) {
//     return;
//   }
//   onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
//     setUserData(doc.data());
//   });
// }, [currentUser]);