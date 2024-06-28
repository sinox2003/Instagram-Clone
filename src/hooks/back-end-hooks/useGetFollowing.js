import {useCallback, useState} from 'react';
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore';

const useGetFollowing = () => {
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFollowing = useCallback(async (username, searchValue) => {
        const db = getFirestore();

        try {
            setLoading(true);

            const usersRef = collection(db, 'users');
            const userQuery = query(usersRef, where('username', '==', username));
            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                const userData = userDoc.data();
                const followingUIDs = userData.following || [];

                const followingPromises = followingUIDs.map(async (uid) => {
                    const followingQuery = query(usersRef, where('uid', '==', uid));
                    const followingSnapshot = await getDocs(followingQuery);
                    return followingSnapshot.docs[0]?.data();
                });

                let followingProfiles = await Promise.all(followingPromises);

                if (searchValue) {
                    followingProfiles = followingProfiles
                        .filter((profile) =>
                            profile?.username?.toLowerCase().includes(searchValue.toLowerCase().trim())
                        )
                        .sort((a, b) => a.username.localeCompare(b.username));
                }


                setFollowing(followingProfiles.filter(Boolean));
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { following, loading, error, fetchFollowing };
};

export default useGetFollowing;
