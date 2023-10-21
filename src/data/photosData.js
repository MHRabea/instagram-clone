import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { query, collection, where, getDocs } from "firebase/firestore";
import useFollowedUsersIds from "./followedUsersIdsData";
import useUserData from "./currentUserData";


export default function usePhotosData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { idsData, isLoading } = useFollowedUsersIds();
    const currentUserData = useUserData();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, "photos"), where("userId", "in", idsData));
                const snapShot = await getDocs(q);
                const docs = [];
                snapShot.forEach(doc => {
                    docs.push(doc.data());
                });
                setData(docs);
                setLoading(false);

            } catch (e) {
                console.log("error fetching data", e);
            }
        };
        if (!isLoading) {
            fetchData();
        }
        //eslint-disable-next-line
    }, [isLoading]);

const likedPhotos = data.map(doc => {
    const likedPhoto = doc.likes.includes(currentUserData.userId)
    return {...doc , likedPhoto}
})



    return { data : likedPhotos, loading };

}