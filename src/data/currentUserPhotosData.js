import { useContext, useEffect, useState } from "react";
import { doc ,getDoc} from "firebase/firestore";
import { AuthContext } from "../context/authcontext";
import { db } from "../firebase/config";



export default function useUserPhotosData() {
  const { currentUser } = useContext(AuthContext);
  const [currentUserPhotos, setCurrentUserPhotos] = useState([]);
//   const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser.Loading) {
      return;
    }

    const fetchData = async () => {
      const docRef = doc(db, 'users' , currentUser.uid);
      try {
        const snapshot = await getDoc(docRef);
        if(snapshot.exists()){
          setCurrentUserPhotos(snapshot.data().imageSrc)
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


  return currentUserPhotos; 

}


