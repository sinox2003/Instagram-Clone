import {useState} from "react";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {doc, updateDoc} from "firebase/firestore";
import useAuthStore from "../../store/Backend-stores/authStore.js";
import useUserProfileStore from "../../store/Backend-stores/userProfileStore.js";
import useShowToast from "../useShowToast.jsx";
import {firestore, storage} from "../../config/firebase.js";
import useSliderAlert from "../useSliderAlert.jsx";

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const { setIsSliderAlertOpen } = useSliderAlert();
	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const showToast = useShowToast();

	const editProfile = async (inputs, selectedFile) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		const storageRef = ref(storage, `profilePics/${authUser.uid}`);
		const userDocRef = doc(firestore, "users", authUser.uid);

		let URL = "";
		try {
			if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
			}

			console.log(inputs)

			const updatedUser = {
				...authUser,
				fullName: inputs.fullName,
				username: inputs.username,
				bio: inputs.bio,
				profilePicURL: URL || authUser.profilePicURL,
			};

			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			setIsSliderAlertOpen(true, "Profile updated successfully");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;
