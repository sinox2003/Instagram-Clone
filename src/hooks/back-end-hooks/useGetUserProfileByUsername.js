import {useEffect, useState} from "react";

import {collection, getDocs, query, where} from "firebase/firestore";
import useUserProfileStore from "../../store/Backend-stores/userProfileStore.js";
import {firestore} from "../../config/firebase.js";

const useGetUserProfileByUsername = (username) => {
	const [isLoading, setIsLoading] = useState(true);
	const { userProfile, setUserProfile } = useUserProfileStore();

	const [user, setUser] = useState(null)


	useEffect(() => {
		const getUserProfile = async () => {
			try {
				const q = query(collection(firestore, "users"), where("username", "==", username));
				const querySnapshot = await getDocs(q);

				if (querySnapshot.empty) return setUserProfile(null);

				let userDoc;
				querySnapshot.forEach((doc) => {
					userDoc = doc.data();
				});

				setUserProfile(userDoc);
				setUser(userDoc)

			} catch (error) {

				console.error(error);

			} finally {
				setIsLoading(false);
			}
		};

		getUserProfile();

	}, [username]);

	return { isLoading, userProfile ,user};
};

export default useGetUserProfileByUsername;
