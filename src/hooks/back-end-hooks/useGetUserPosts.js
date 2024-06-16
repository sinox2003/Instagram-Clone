import { useEffect, useState } from "react";

import {collection, documentId, getDocs, limit, orderBy, query, startAfter, where} from "firebase/firestore";
import usePostStore from "../../store/Backend-stores/postStore.js";
import useShowToast from "../useShowToast.jsx";
import useUserProfileStore from "../../store/Backend-stores/userProfileStore.js";
import {firestore} from "../../config/firebase.js";
import useGetUserProfileByUsername from "./useGetUserProfileByUsername.js";

const useGetUserPosts = (username) => {
  const [isNextLoading, setIsNextLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const showToast = useShowToast();
  const [arePostsLoading, setArePostsLoading] = useState(true);

  const { user, userProfile, isLoading } = useGetUserProfileByUsername(username);
  const [latestDoc, setLatestDoc] = useState()
  const [isInfiniteScrolling, setIsInfiniteScrolling] = useState(1)


  const getUserPost = async () => {
    setArePostsLoading(true);
    try {
      const postsData = [];

      if (user && user.posts && user.posts.length > 0) {

        const postsQuery = query(collection(firestore, "posts"), where(documentId(), "in", user.posts),orderBy('createdAt','desc'),limit(9));
        const querySnapshot = await getDocs(postsQuery);

        querySnapshot.forEach((doc) => {
          postsData.push({ ...doc.data(), id: doc.id });
        });

        setLatestDoc(querySnapshot.docs[querySnapshot.docs.length-1]);
        setPosts(postsData);
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
      const postsData = [];


      const postsQuery = query(collection(firestore, "posts"), where(documentId(), "in", user.posts),orderBy('createdAt','desc'),startAfter(latestDoc || 0),limit(9));
      const querySnapshot = await getDocs(postsQuery);
      setLatestDoc(querySnapshot.docs[querySnapshot.docs.length-1]);
      querySnapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });

      setIsInfiniteScrolling(querySnapshot.docs.length)
      setPosts(prevState => [...prevState,...postsData]);

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
      getUserPost();
    }
  }, [isLoading, user]);

  return { posts, isInfiniteScrolling, arePostsLoading,isNextLoading,getNextPosts };
};

export default useGetUserPosts;
