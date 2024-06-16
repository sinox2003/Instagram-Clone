import { useEffect, useState } from "react";
import {doc, getDoc, collection, query, where, getDocs, documentId, limit, startAfter} from "firebase/firestore";
import useShowToast from "../useShowToast.jsx";
import { firestore } from "../../config/firebase.js";
import usePostStore from "../../store/Backend-stores/postStore.js";
import useGetUserProfileByUsername from "./useGetUserProfileByUsername.js";

const useGetSavedPosts = (username) => {
    const [isNextLoading, setIsNextLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const showToast = useShowToast();
    const [arePostsLoading, setArePostsLoading] = useState(true);

    const { user, userProfile, isLoading } = useGetUserProfileByUsername(username);
    const [latestDoc, setLatestDoc] = useState()
    const [isInfiniteScrolling, setIsInfiniteScrolling] = useState(1)


    const getSavedPosts = async () => {
        setArePostsLoading(true);
        try {
            const savedPostsData = [];

            if (user && user.savedPosts && user.savedPosts.length > 0) {

                const postsQuery = query(collection(firestore, "posts"), where(documentId(), "in", user.savedPosts),limit(9));
                const querySnapshot = await getDocs(postsQuery);

                querySnapshot.forEach((doc) => {
                    savedPostsData.push({ ...doc.data(), id: doc.id });
                });

                setLatestDoc(querySnapshot.docs[querySnapshot.docs.length-1]);
                setPosts(savedPostsData);
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
            const savedPostsData = [];


            const postsQuery = query(collection(firestore, "posts"), where(documentId(), "in", user.savedPosts),startAfter(latestDoc || 0),limit(9));
            const querySnapshot = await getDocs(postsQuery);
            setLatestDoc(querySnapshot.docs[querySnapshot.docs.length-1]);
            querySnapshot.forEach((doc) => {
                savedPostsData.push({ ...doc.data(), id: doc.id });
            });

            setIsInfiniteScrolling(querySnapshot.docs.length)
            setPosts(prevState => [...prevState,...savedPostsData]);

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
            getSavedPosts();
        }
    }, [isLoading, user]);

    return { posts, isInfiniteScrolling, arePostsLoading,isNextLoading,getNextPosts };
};

export default useGetSavedPosts;
