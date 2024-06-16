import { useEffect, useState } from "react";
import {collection, getDocs, limit,startAfter, orderBy, query} from "firebase/firestore";
import usePostStore from "../../store/Backend-stores/postStore.js";
import useShowToast from "../useShowToast.jsx";
import { firestore } from "../../config/firebase.js";

const useGetAllPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();
    const [isNextLoading, setIsNextLoading] = useState(false);
    const [latestDoc, setLatestDoc] = useState()
    const [isInfiniteScrolling, setIsInfiniteScrolling] = useState(1)

    const getPosts = async () => {
        setIsLoading(true);
        // setPosts([]);

        try {
            const q = query(collection(firestore, "posts"),orderBy('createdAt','desc'),limit(5));
            const querySnapshot = await getDocs(q);

            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), id: doc.id });
            });
            setLatestDoc(querySnapshot.docs[querySnapshot.docs.length-1]);

            // posts.sort((a, b) => b.createdAt - a.createdAt);
            setPosts(posts);
        } catch (error) {
            showToast("Error", error.message, "error");
            console.log(error);
            setPosts([]);
        }
        setIsLoading(false);
    };

    const getNextPosts = async () => {


        setIsNextLoading(true);
        try {
            const q = query(collection(firestore, "posts"),orderBy('createdAt','desc'),startAfter(latestDoc || 5),limit(5));
            const querySnapshot = await getDocs(q);
            setLatestDoc(querySnapshot.docs[querySnapshot.docs.length-1]);
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), id: doc.id });
            });


            setIsInfiniteScrolling(querySnapshot.docs.length)

            setPosts(posts);
        } catch (error) {
            showToast("Error", error.message, "error");
            console.log(error);
            setPosts([]);
        }
        setIsNextLoading(false);
    };


    useEffect(() => {

        getPosts();

    }, []);

    return { isLoading, posts ,getNextPosts ,isNextLoading,latestDoc ,isInfiniteScrolling };
};

export default useGetAllPosts;
