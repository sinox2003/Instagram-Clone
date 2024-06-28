import {useSignInWithGoogle} from "react-firebase-hooks/auth";

import {doc, getDoc, setDoc} from "firebase/firestore";
import {auth, firestore} from "../../config/firebase.js";
import useShowToast from "../useShowToast.jsx";
import useAuthStore from "../../store/Backend-stores/authStore.js";

const useGoogle = () => {
  const [signInWithGoogle, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const userLogin = useAuthStore((state) => state.login);
  const googleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        //user already exists => login
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        userLogin(userDoc);
      } else {
        //user not found => signup
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          //on prend le nom depuis l'email
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
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
        userLogin(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { googleAuth, error };
};

export default useGoogle;
