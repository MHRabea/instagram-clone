// import Skeleton from "react-loading-skeleton"
import {query , collection , onSnapshot  } from "firebase/firestore";
import { db } from "../firebase/config";
import {useEffect ,useState} from "react";
// import { AuthContext } from "../context/authcontext";a




export default function useUsersData(){
    const [data, setData] = useState([]);
    // const { currentUser } = useContext(AuthContext);
    // const [followed, setFollowed] = useState();
    useEffect(() => {
      const q = query(collection(db, "users")  );
      onSnapshot(q, (querySnapshot) => {
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push(doc.data());
          setData(usersData);
        });
      });
    }, []);
    return data;
}

