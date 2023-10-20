import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase/config";
import { query, collection, where, getDocs } from "firebase/firestore";
import useFollowedUsersIds from "./followedUsersIdsData";


export default function usePhotosData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { idsData, isLoading } = useFollowedUsersIds();
    const memorizedIdsData = useMemo(() => idsData, [idsData]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, "photos"), where("userId", "in", memorizedIdsData));
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
        // eslint-disable-next-line
    }, [isLoading]);






    return { data, loading };

}