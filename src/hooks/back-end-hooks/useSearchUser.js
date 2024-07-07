import { collection, endAt, getDocs, limit, orderBy, query, startAt } from 'firebase/firestore';
import { useState } from 'react';
import { firestore } from '../../config/firebase.js';

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const getUserProfile = async (username) => {
        setIsLoading(true);
        setUsers([]);
        setError(null);

        try {
            const usersCollection = collection(firestore, 'users');
            const q = query(
                usersCollection,
                orderBy('username'),
                startAt(username),
                endAt(username + '\uf8ff'), // ensures the search is inclusive and works with Firestore's string ordering
                limit(8) // you can adjust the limit as needed
            );

            const querySnapshot = await getDocs(q);

            const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setUsers(usersList);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, getUserProfile, users, setUsers, error };
};

export default useSearchUser;
