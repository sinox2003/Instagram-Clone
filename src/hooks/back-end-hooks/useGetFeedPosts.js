import {useEffect, useState} from "react";
import usePostStore from "../../store/Backend-stores/postStore.js";
import useAuthStore from "../../store/Backend-stores/authStore.js";
import useShowToast from "../useShowToast.jsx";
import {collection, getDocs, limit, query, startAfter, where} from "firebase/firestore";
import {firestore} from "../../config/firebase.js";

const useGetFeedPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();

	const [isNextLoading, setIsNextLoading] = useState(false);
	const [latestDoc, setLatestDoc] = useState()
	const [isInfiniteScrolling, setIsInfiniteScrolling] = useState(1)

	const getFeedPosts = async () => {
		setIsLoading(true);
		if (authUser.following.length === 0) {
			setIsLoading(false);
			setPosts([]);
			return;
		}
		try {
			const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following),limit(5));
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


	const getNextFeedPosts = async () => {
		setIsNextLoading(true);

		if (authUser.following.length === 0) {
			setIsLoading(false);
			setPosts([]);
			return;
		}

		try {
			const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following),startAfter(latestDoc || 0),limit(5));
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

		 getFeedPosts();

	}, []);

	return { isLoading, posts,getNextFeedPosts,isNextLoading,isInfiniteScrolling };
};

export default useGetFeedPosts;