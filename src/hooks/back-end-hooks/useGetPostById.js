import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import useShowToast from "../useShowToast.jsx";
import { firestore } from "../../config/firebase.js";

const useGetPostById = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState(null);
	const showToast = useShowToast();

	const getPost = async (postId) => {
		setIsLoading(true);
		setPost(null);
		try {
			const postRef = await getDoc(doc(firestore, "posts", postId));
			if (postRef.exists()) {
				const postData = postRef.data();
				setPost({ ...postData, id: postId });
			}
		} catch (error) {
			showToast("Error", error.message, "error");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, post, getPost };
};

export default useGetPostById;
