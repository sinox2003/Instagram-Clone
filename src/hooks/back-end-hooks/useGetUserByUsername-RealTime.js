
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import useUserProfileStore from "../../store/Backend-stores/userProfileStore.js";
import { firestore } from "../../config/firebase.js";

const UseGetUserByUsernameRealTime = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const q = query(collection(firestore, "users"), where("username", "==", username));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (querySnapshot.empty) {
                setUserProfile(null);
                setUser(null);
            } else {
                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });
                setUserProfile(userDoc);
                setUser(userDoc);
            }
            setIsLoading(false);
        }, (error) => {
            console.error(error);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [username]);

    return { isLoading, userProfile, user };
};

export default UseGetUserByUsernameRealTime;
