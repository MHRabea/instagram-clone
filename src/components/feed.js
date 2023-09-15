// import Skeleton from "react-loading-skeleton"
import {query , collection , onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import {useEffect ,useState , useContext} from "react";
import useUsersData from "../firebase/usersData";
import { AuthContext } from "../context/authcontext";




export default function Feed(){
    const{currentUser} = useContext(AuthContext);

    const usersData = useUsersData()
    console.log(usersData)
    const value = currentUser.uid
    const filteredData = usersData.filter((item ) => item.userId !== value)
    console.log(filteredData)
    return (
        <div className="basis-3/4 pl-5"> 
            Feed
        </div>
    )
}
