import useAuthStore from "../../store/Backend-stores/authStore.js";
import { useState } from "react";
import useShowToast from "../useShowToast.jsx";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase.js";

const useSavePost = (post, id) => {
    const authUser = useAuthStore((state) => state.user);
    const [isUpdating, setIsUpdating] = useState(false);
    const [saved, setSaved] = useState(post.saves.includes(authUser?.uid));

    const showToast = useShowToast();

    const handleSavePost = async () => {
        if (isUpdating) return;
        if (!authUser) return showToast('Error', 'You must be logged in to save this post', 'error');
        setIsUpdating(true);
        try {
            const postRef = doc(firestore, 'posts', id);
            await updateDoc(postRef, {
                saves: saved ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });
            setSaved(!saved);

            // Update user saved posts
            const userRef = doc(firestore, 'users', authUser.uid);
            await updateDoc(userRef, {
                savedPosts: saved ? arrayRemove(id) : arrayUnion(id)
            });

        } catch (error) {
            showToast('Error', error.message, 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    return { saved, handleSavePost, isUpdating };
};

export default useSavePost;
