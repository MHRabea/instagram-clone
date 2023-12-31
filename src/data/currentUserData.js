import { useContext, useEffect, useState } from "react";
import { doc ,getDoc} from "firebase/firestore";
import { AuthContext } from "../context/authcontext";
import { db } from "../firebase/config";



export default function useUserData() {
  const { currentUser } = useContext(AuthContext);
  const [currentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    if (currentUser.Loading) {
      return;
    }

    const fetchData = async () => {
      const docRef = doc(db, 'users' , currentUser.uid);
      try {
        const snapshot = await getDoc(docRef);
        if(snapshot.exists()){
          setCurrentUserData(snapshot.data())
        }
      } catch (error) {
        console.log( 'error fetching data' ,error)
      } finally {
      }
    }
    fetchData();
    return () => {
      //cleanUp function 
    }
  }, [currentUser]);

  return currentUserData; 

}


