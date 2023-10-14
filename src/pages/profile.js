import {useState , useEffect} from "react";
import {useNavigate } from "react-router-dom"
import useUserData from "../data/currentUserDataWithLoading";
import * as ROUTES from "../components/routes";
import ProfileHeader from "../components/profile/profieHeader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



export default function Profile() {
    const {currentUserData , isLoading } = useUserData();
    const [isUserLoggedIn , setIsUserLoggedIn] = useState(false)
    const Navigate  = useNavigate() 
    console.log(currentUserData) 

    useEffect(() => {
        async function checkUser(){ 
            if(currentUserData){
                setIsUserLoggedIn(true)
            } else {
                setIsUserLoggedIn(false)
               Navigate(ROUTES.Not_Found)
            }
        }
        checkUser()
    },[Navigate , currentUserData])


    return (
      !isLoading? (isUserLoggedIn ? (
        <div>
        <ProfileHeader />
        {currentUserData.displayName}
        </div>
       ) :null) : <SkeletonTheme baseColor="#df3b3b" highlightColor="#ddb1b1">
        <Skeleton className="h-16 w-16" />
       </SkeletonTheme>
    )
}