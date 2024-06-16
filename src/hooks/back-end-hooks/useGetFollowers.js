import { useState, useCallback } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const useGetFollowers = () => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFollowers = useCallback(async (username, searchValue) => {
        const db = getFirestore();

        try {
            setLoading(true);
            setError(null);

            // Step 1: Get the user document by username
            const usersRef = collection(db, 'users');
            const userQuery = query(usersRef, where('username', '==', username));
            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                const userData = userDoc.data();
                const followerUIDs = userData.followers || [];

                // Step 2: Fetch follower profiles by UIDs
                const followerPromises = followerUIDs.map(async (uid) => {
                    const followerQuery = query(usersRef, where('uid', '==', uid));
                    const followerSnapshot = await getDocs(followerQuery);
                    return followerSnapshot.docs[0]?.data();
                });

                let followerProfiles = await Promise.all(followerPromises);

                if (searchValue) {
                    followerProfiles = followerProfiles.filter((profile) =>
                        profile?.username?.toLowerCase().includes(searchValue.toLowerCase())
                    );
                }

                setFollowers(followerProfiles.filter(Boolean));
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { followers, isFollowersLoading: loading, error, fetchFollowers };
};

export default useGetFollowers;
