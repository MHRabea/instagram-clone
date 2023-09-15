import { AuthContext } from "../context/authcontext";
import { useContext , useEffect , useState } from "react";
import { storage , db  } from "./config";






export default function usePhotos() {
    const [photos , setPhotos]= useState(null);
    const {currentUser} = useContext(AuthContext);
    
    return (
        <p>photos</p>
    )
}