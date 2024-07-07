import { useEffect, useState } from "react";
import useAuthStore from "../../store/Backend-stores/authStore.js";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../config/firebase.js";

const useGetNotification = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const authUser = useAuthStore(state => state.user);

    useEffect(() => {
        if (authUser?.uid) {
            const notificationsRef = doc(firestore, 'userNotifications', authUser.uid);

            const unsubscribe = onSnapshot(notificationsRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    // Order the notifications by timestamp before setting the state
                    const sortedNotifications = data.notifications?.sort((a, b) => b.timestamp - a.timestamp);
                    setNotifications(sortedNotifications || []);
                } else {
                    console.log("No such document!");
                }
                setIsLoading(false);
            }, (error) => {
                console.error("Error fetching notifications: ", error.message);
                setIsLoading(false);
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        } else {
            setIsLoading(false);
        }
    }, [authUser?.uid]);

    return { notifications, isLoading };
};

export default useGetNotification;
