import {useEffect} from "react";
import {get, onDisconnect, onValue, ref, set} from "firebase/database";
import {realtimeDatabase} from "../../config/firebase.js";

const useUserPresence = (user) => {
    useEffect(() => {
        if (!user) return;

        const userStatusDatabaseRef = ref(realtimeDatabase, `/status/${user.uid}`);

        const isOfflineForDatabase = {
            state: 'offline',
            last_changed: Date.now(),
        };

        const isOnlineForDatabase = {
            state: 'online',
            last_changed: Date.now(),
        };

        const updateUserStatus = async () => {
            const statusSnapshot = await get(userStatusDatabaseRef);
            if (!statusSnapshot.exists()) {
                await set(userStatusDatabaseRef, isOfflineForDatabase);
            }

            onValue(ref(realtimeDatabase, '.info/connected'), (snapshot) => {
                if (snapshot.val() === false) {
                    return;
                }
                onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
                    set(userStatusDatabaseRef, isOnlineForDatabase);
                });
            });
        };

        updateUserStatus();
    }, [user]);
};

export default useUserPresence;
