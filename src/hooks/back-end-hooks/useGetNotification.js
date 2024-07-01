import {useEffect, useState} from "react";
import useAuthStore from "../../store/Backend-stores/authStore.js";
import {collection, doc, getDocs, orderBy, query} from "firebase/firestore";
import {firestore} from "../../config/firebase.js";

const UseGetNotification = () => {
    const [notifications, setNotifications] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const authUser = useAuthStore(state => state.user);


    const getNotifications =async ()=>{
        setIsLoading(true)
        if(authUser?.uid){

            try {
                const notificationsCollectionRef = collection(firestore, `userNotifications/${authUser.uid}/notifications`);
                const q = query(notificationsCollectionRef);

                const querySnapshot = await getDocs(q);
                console.log(querySnapshot)
                // const notificationsList = querySnapshot.docs.map(doc => doc.data());
                // setNotifications(notificationsList);
            } catch (error) {
                console.error("Error fetching notifications: ", error.message);
            }finally {
                setIsLoading(false)
            }

        }
    }

    useEffect(() => {
        getNotifications()
    }, []);

    return { notifications, isLoading, isFetchingMore }
}

export default UseGetNotification;