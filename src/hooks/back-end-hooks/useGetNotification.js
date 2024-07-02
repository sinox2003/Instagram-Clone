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
    

            try {


                const userNotificationsRef = firebase.firestore().collection('userNotifications').doc(authUser.uid);

                userNotificationsRef.get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const notifications = data.notifications;
                    setNotifications(notifications);
                 console.log("Document data:", doc.data());
                } else {
                    console.log("No such document!");
                  }
              }).catch((error) => {
                 console.error("Error getting document:", error);
             });

            setIsLoading(false)
    }

    useEffect(() => {
        getNotifications()
    }, []);

    return { notifications, isLoading, isFetchingMore }
}

export default UseGetNotification;
