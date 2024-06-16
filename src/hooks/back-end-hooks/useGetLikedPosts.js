import { useEffect, useState } from "react";
import {collection, getDocs, query, where, documentId, orderBy, limit, startAfter} from "firebase/firestore";
import useShowToast from "../useShowToast.jsx";
import { firestore } from "../../config/firebase.js";
import useGetUserProfileByUsername from "./useGetUserProfileByUsername.js";

const useGetLikedPosts = (username) => {
    const [isNextLoading, setIsNextLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const showToast = useShowToast();
    const [arePostsLoading, setArePostsLoading] = useState(true);

    const { user, userProfile, isLoading } = useGetUserProfileByUsername(username);
    const [latestDoc, setLatestDoc] = useState()
    const [isInfiniteScrolling, setIsInfiniteScrolling] = useState(1)


    const getLikedPosts = async () => {
        setArePostsLoading(true);
        try {
            const likedPostsData = [];

            if (user && user.likedPosts && user.likedPosts.length > 0) {

                const postsQuery = query(collection(firestore, "posts"), where(documentId(), "in", user.likedPosts),limit(9));
                const querySnapshot = await getDocs(postsQuery);

                querySnapshot.forEach((doc) => {
                    likedPostsData.push({ ...doc.data(), id: doc.id });
                });

                setLatestDoc(querySnapshot.docs[querySnapshot.docs.length-1]);
                setPosts(likedPostsData);
            } else {
                setPosts([]);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
            console.log(error);
            setPosts([]);
        } finally {
            setArePostsLoading(false);
        }
    };

    const getNextPosts = async () => {
        setIsNextLoading(true);
        try {
            const likedPostsData = [];


                const postsQuery = query(collection(firestore, "posts"), where(documentId(), "in", user.likedPosts),startAfter(latestDoc || 0),limit(9));
                const querySnapshot = await getDocs(postsQuery);
                setLatestDoc(querySnapshot.docs[querySnapshot.docs.length-1]);
                querySnapshot.forEach((doc) => {
                    likedPostsData.push({ ...doc.data(), id: doc.id });
                });

                setIsInfiniteScrolling(querySnapshot.docs.length)
                setPosts(prevState => [...prevState,...likedPostsData]);

        } catch (error) {
            showToast("Error", error.message, "error");
            console.log(error);
            setPosts([]);
        } finally {
            setIsNextLoading(false);
        }
    };


    useEffect(() => {
        if (!isLoading ) {
            getLikedPosts();
        }
    }, [isLoading, user]);

    return { posts, isInfiniteScrolling, arePostsLoading,isNextLoading,getNextPosts };
};

export default useGetLikedPosts;
