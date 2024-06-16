import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import useShowToast from "../useShowToast.jsx";
import useUserProfileStore from "../../store/Backend-stores/userProfileStore.js";
import { firestore } from "../../config/firebase.js";

const useGetLikesByPost = (postId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [likes, setLikes] = useState([]);
    const showToast = useShowToast();

    useEffect(() => {
        const getLikes = async () => {
            if (!postId) return;

            setIsLoading(true);
            setLikes([]);

            try {
                // Fetch the post document
                const postRef = doc(firestore, "posts", postId);
                const postDoc = await getDoc(postRef);

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    const likes = postData.likes || [];

                    // Fetch user profiles for each like UID
                    const usersPromises = likes.map((uid) => {
                        const userRef = doc(firestore, "users", uid);
                        return getDoc(userRef).then(userDoc => ({
                            ...userDoc.data(),
                            id: userDoc.id
                        }));
                    });

                    const users = await Promise.all(usersPromises);
                    setLikes(users);
                } else {
                    showToast("Error", "Post not found", "error");
                }
            } catch (error) {
                showToast("Error", error.message, "error");
                console.log(error);
                setLikes([]);
            } finally {
                setIsLoading(false);
            }
        };

        getLikes();
    }, [postId]);

    return { isLoading, likes };
};

export default useGetLikesByPost;
