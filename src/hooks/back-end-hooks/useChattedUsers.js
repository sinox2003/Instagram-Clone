import { useEffect, useState, useMemo } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import useAuthStore from "../../store/Backend-stores/authStore.js";
import { firestore } from "../../config/firebase.js";

const useChattedUsers = (isOpen) => {
    const [chattedUsers, setChattedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const authUser = useAuthStore(state => state.user);

    useEffect(() => {
        if (!authUser.uid) return;

        setLoading(true);
        const unsub = onSnapshot(doc(firestore, "userChats", authUser.uid),

            (doc) => {
                if (doc.exists()) {
                    const userChatsData = doc.data();
                    setChattedUsers(userChatsData);
                }
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching chatted users:", error);
                setLoading(false);
            }
        );

        return () => {
            unsub();
        };
    }, [authUser.uid, isOpen]);

    const sortedChattedUsers = useMemo(() => {
        return chattedUsers ? Object.entries(chattedUsers).sort((a, b) => b[1].date - a[1].date) : [];
    }, [chattedUsers]);

    return { chattedUsers: sortedChattedUsers, loading };
};

export default useChattedUsers;
