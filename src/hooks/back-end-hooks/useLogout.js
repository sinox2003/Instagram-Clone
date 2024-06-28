import {useSignOut} from "react-firebase-hooks/auth";
import useShowToast from "../useShowToast.jsx";
import useAuthStore from "../../store/Backend-stores/authStore.js";
import {auth} from "../../config/firebase.js";

const useLogout = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore(state => state.logout);

    const handleLogout = async () => {
        try{
            await signOut();
            localStorage.removeItem("user-info");
            logoutUser();
            unsetChatUser();



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