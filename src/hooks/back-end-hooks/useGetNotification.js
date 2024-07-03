import { useEffect, useState } from "react";
import useAuthStore from "../../store/Backend-stores/authStore.js";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase.js";

const useGetNotification = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore(state => state.user);

    const getNotifications = async () => {
        setIsLoading(true);
        if (authUser?.uid) {
            const notificationsRef = doc(firestore, 'userNotifications', authUser.uid);

            try {
                const docSnapshot = await getDoc(notificationsRef);
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    // Order the notifications by timestamp before setting the state
                    const sortedNotifications = data.notifications?.sort((a, b) => b.timestamp - a.timestamp);
                    setNotifications(sortedNotifications || []);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching notifications: ", error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        getNotifications();
    }, [authUser?.uid]);

    return { notifications, isLoading };
};

export default useGetNotification;
