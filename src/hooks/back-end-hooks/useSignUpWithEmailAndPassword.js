import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, firestore } from "../../config/firebase.js";
import useShowToast from "../useShowToast.jsx";
import useAuthStore from "../../store/Backend-stores/authStore.js";

const useSignUpWithEmailAndPassword = () => {
	const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);

	const checkEmailExists = async (email) => {
		const usersRef = collection(firestore, "users");
		const emailQuery = query(usersRef, where("email", "==", email));
		const emailQuerySnapshot = await getDocs(emailQuery);
		console.log(!emailQuerySnapshot.empty);
		return !emailQuerySnapshot.empty;
	};

	const checkUsernameExists = async (username) => {
		const usersRef = collection(firestore, "users");
		const usernameQuery = query(usersRef, where("username", "==", username));
		const usernameQuerySnapshot = await getDocs(usernameQuery);
		return !usernameQuerySnapshot.empty;
	};

	const signup = async (username, fullName, email, password) => {
		try {
			const newUser = await createUserWithEmailAndPassword(email, password);
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			if (newUser) {
				const userDoc = {
					uid: newUser.user.uid,
					email: email,
					username: username,
					fullName: fullName,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					savedPosts: [],
					likedPosts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				await setDoc(doc(firestore, "userChats", newUser.user.uid), {});
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { loading, error, signup, checkEmailExists, checkUsernameExists };
};

export default useSignUpWithEmailAndPassword;
