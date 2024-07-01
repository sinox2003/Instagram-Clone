import { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import useAuthStore from "../../store/Backend-stores/authStore.js";
import useUserProfileStore from "../../store/Backend-stores/userProfileStore.js";
import useShowToast from "../useShowToast.jsx";
import { firestore } from "../../config/firebase.js";

const useFollowUser = (userId) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [loading, setLoading] = useState(true);
	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const { userProfile, setUserProfile } = useUserProfileStore();
	const showToast = useShowToast();

	const handleFollowUser = async () => {
		setIsUpdating(true);
		try {
			const currentUserRef = doc(firestore, "users", authUser.uid);
			const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

			await updateDoc(currentUserRef, {
				following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
			});

			await updateDoc(userToFollowOrUnfollowRef, {
				followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
			});

			if (isFollowing) {
				// Unfollow
				setAuthUser({
					...authUser,
					following: authUser.following.filter((uid) => uid !== userId),
				});
				if (userProfile)
					setUserProfile({
						...userProfile,
						followers: userProfile.followers.filter((uid) => uid !== authUser.uid),
					});

				localStorage.setItem(
					"user-info",
					JSON.stringify({
						...authUser,
						following: authUser.following.filter((uid) => uid !== userId),
					})
				);
				setIsFollowing(false);
			} else {
				// Follow
				setAuthUser({
					...authUser,
					following: [...authUser.following, userId],
				});

				if (userProfile)
					setUserProfile({
						...userProfile,
						followers: [...userProfile.followers, authUser.uid],
					});

				localStorage.setItem(
					"user-info",
					JSON.stringify({
						...authUser,
						following: [...authUser.following, userId],
					})
				);
				setIsFollowing(true);

				// Add notification
				const notification = {
					type: "newFollower",
					followerId: authUser.uid,
					timestamp: Date.now(),

				};

				const userNotificationsRef = doc(firestore, "userNotifications", userId);
				await updateDoc(userNotificationsRef, {
					notifications: arrayUnion(notification),
					unread: true,
				});
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	useEffect(() => {
		setLoading(true)

		if (authUser) {
			const isFollowing = authUser.following.includes(userId);
			setIsFollowing(isFollowing);
			setLoading(false)
		}

	}, [authUser, userId]);



	return { isUpdating,loading, isFollowing, handleFollowUser };
};

export default useFollowUser;
