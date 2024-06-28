import {collection, endAt, getDocs, limit, orderBy, query, startAt} from 'firebase/firestore';
import {useState} from 'react';
import {firestore} from '../../config/firebase.js';

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);

    const getUserProfile = async (username) => {
        setIsLoading(true);
        setUser([]);
        setError(null);
        try {
            const lowerCaseUsername = username.toLowerCase(); // Convert input to lowercase
            const usersRef = collection(firestore, 'users');
            const q = query(usersRef,
                orderBy('username'),
                startAt(lowerCaseUsername),
                endAt(lowerCaseUsername + '\uf8ff'),
                limit(8)); // Limit the number of results to 8
            const querySnapshot = await getDocs(q);

            const users = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.username.toLowerCase().includes(lowerCaseUsername)) { // Check with lowercase
                    users.push(data);
                }
            });

            setUser(users);
        } catch (error) {
            console.error(error);
            setError(error.message);
            setUser([]);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, getUserProfile, user, setUser, error };
};

export default useSearchUser;
