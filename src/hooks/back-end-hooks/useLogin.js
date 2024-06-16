import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useAuthStore from "../../store/Backend-stores/authStore.js";
import {auth, firestore} from "../../config/firebase.js";
import {doc,getDoc} from "firebase/firestore";

const useLogin = () => {

	const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
	const loginUser = useAuthStore((state) => state.login);

	const login = async (email,password) => {

		try {
			const userCred = await signInWithEmailAndPassword(email, password);

			if (userCred) {
				const docRef = doc(firestore, "users", userCred.user.uid);
				const docSnap = await getDoc(docRef);
				localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
				loginUser(docSnap.data());
			}
		} catch (error) {
			console.error(error)
		}
	};

	return { loading, error, login };
};

export default useLogin;