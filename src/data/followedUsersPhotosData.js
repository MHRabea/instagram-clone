import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import useUserData from "./currentUserData";

export default function useFollowedPhotosData() {
  const currentUserData = useUserData();
  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "users") , orderBy("dateCreated" , "desc"));
    onSnapshot(q, (querySnapshot) => {
      const photosData = [];
      querySnapshot.forEach((doc) => {
        photosData.push({...doc.data()});
      });
      setData(photosData);
    });
  }, []);
  const filteredData = data.filter((item) => item.userId !== currentUserData.userId && currentUserData.following && currentUserData.following.includes(item.userId));
  const photosData= filteredData.map((item) => {
    return item.imageSrc.sort()
  })
  return photosData;
}































// import { useEffect, useState } from "react";
// import useFollowedUsersData from "./followedUsersData";

// export default function Photos() {
//   const [photos, setPhotos] = useState([]);

//   const followedUsers = useFollowedUsersData();
//   console.log(followedUsers)

//   useEffect(() => {
//     console.log(followedUsers);
//     const photosData = []

//     followedUsers.forEach((user) => {
//         photosData.push(user.imageSrc)
//   })
//   setPhotos(photosData)
//   console.log(photos)
// },[followedUsers])


// return ( 
//   <div className="items-center  flex flex-col">
//   {photos.map((photo, index) => (
//     <img className="h-36 w-36 rounded-sm" key={index} src={photo} alt="" />
//   ))}
// </div>
// )



// }
