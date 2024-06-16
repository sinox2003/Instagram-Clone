import { useSignOut } from "react-firebase-hooks/auth";
import useShowToast from "../useShowToast.jsx";
import useAuthStore from "../../store/Backend-stores/authStore.js";
import {auth} from "../../config/firebase.js";
import useChatStore from "../../store/Backend-stores/chatStore.js";

const useLogout = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore(state => state.logout);
    const unsetChatUser = useChatStore(state => state.unsetUser);

    const handleLogout = async () => {
        try{
            await signOut();
            localStorage.removeItem("user-info");
            logoutUser();
            unsetChatUser();

            // showToast("Success", "User logged out successfully!", "success");

        }catch(e){
            showToast("Error", e.message, "error");
        }
    }
    return {
        handleLogout,
        loading,
        error,
    };
};

export default useLogout;