import useAuthStore from "../../store/Backend-stores/authStore.js";
import { useState } from "react";
import useShowToast from "../useShowToast.jsx";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase.js";

const useLikePost = (post, id) => {
    const authUser = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const [isUpdating, setIsUpdating] = useState(false);
    const [likes, setLikes] = useState(post.likes?.length);
    const [isLiked, setIsLiked] = useState(post.likes?.includes(authUser?.uid));
    const showToast = useShowToast();

    const handleLikePost = async () => {
        if (isUpdating) return;
        if (!authUser) return showToast('Error', 'You must be logged in to like this post', 'error');
        setIsUpdating(true);
        try {
            const postRef = doc(firestore, 'posts', id);
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });
            setIsLiked(!isLiked);
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

            // Update user likes
            const userRef = doc(firestore, 'users', authUser.uid);
            await updateDoc(userRef, {
                likedPosts: isLiked ? arrayRemove(id) : arrayUnion(id)
            });

            // Add notification if the post is liked
            if (!isLiked) {
                const notification = {
                    type: "newLike",
                    likerId: authUser.uid,
                    postImg:post.imageURL,
                    postId: id,
                    timestamp: Date.now(),

                };

                const userNotificationsRef = doc(firestore, "userNotifications", post.createdBy); // Assuming post.userId is the post owner's ID
                await updateDoc(userNotificationsRef, {
                    notifications: arrayUnion(notification),
                    unread: true,
                });
            }

        } catch (error) {
            showToast('Error', error.message, 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
