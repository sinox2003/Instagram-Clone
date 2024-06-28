import {useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../../config/firebase.js";

const useGetUserProfileById = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState(null);

	// const showToast = useShowToast();


		const getUserProfile = async (userId) => {
			setIsLoading(true);
			setUserProfile(null);
			try {
				const userRef = await getDoc(doc(firestore, "users", userId));
				if (userRef.exists()) {
					setUserProfile(userRef.data());
				}
			} catch (error) {
				// showToast("Error", error.message, "error");
				console.error(error.message);
			} finally {
				setIsLoading(false);
			}
		};


	return { isUserLoading:isLoading, userProfile, getUserProfile };
};

export default useGetUserProfileById;