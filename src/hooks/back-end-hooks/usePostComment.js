import { useState } from 'react';
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import useShowToast from "../useShowToast.jsx";
import useAuthStore from "../../store/Backend-stores/authStore.js";
import usePostStore from "../../store/Backend-stores/postStore.js";
import { firestore } from "../../config/firebase.js";

const usePostComment = () => {
    const [isCommenting, setIsCommenting] = useState(false);
    const showToast = useShowToast();
    const authUser = useAuthStore(state => state.user);

    const handlePostComment = async (postId, comment) => {
        if (isCommenting) return;
        if (!authUser) return showToast("Erreur", "You must be online to comment", "error");
        setIsCommenting(true);

        try {
            // Fetch the post details
            const postRef = doc(firestore, "posts", postId);
            const postSnap = await getDoc(postRef);

            if (!postSnap.exists()) {
                throw new Error("Post does not exist");
            }

            const post = postSnap.data();
            const { imageURL, createdBy } = post;

            const newComment = {
                comment,
                createdAt: Date.now(),
                createdBy: authUser.uid,
                postId
            };

            // Insert comment into the Firestore database
            await updateDoc(postRef, {
                comments: arrayUnion(newComment)
            });

            // Add notification
            const notification = {
                type: "newComment",
                commenterId: authUser.uid,
                postId,
                imageURL,
                comment,
                timestamp: Date.now(),
            };

            const userNotificationsRef = doc(firestore, "userNotifications", createdBy);
            await updateDoc(userNotificationsRef, {
                notifications: arrayUnion(notification),
                unread: true,
            });

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsCommenting(false);
        }
    };

    return { isCommenting, handlePostComment };
};

export default usePostComment;
