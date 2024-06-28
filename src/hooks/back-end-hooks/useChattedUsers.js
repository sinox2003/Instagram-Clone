import {useEffect, useMemo, useState} from 'react';
import {doc, getDoc, onSnapshot} from 'firebase/firestore';
import useAuthStore from "../../store/Backend-stores/authStore.js";
import {firestore} from "../../config/firebase.js";

const useChattedUsers = (isOpen) => {
    const [chattedUsers, setChattedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const authUser = useAuthStore(state => state.user);

    useEffect(() => {
        setLoading(true);
        if (!authUser.uid) return;

        const fetchUserDetails = async (uid) => {
            const userDoc = await getDoc(doc(firestore, "users", uid));
            return userDoc.exists() ? userDoc.data() : null;
        };

        const fetchChattedUsers = async () => {



            const unsub = onSnapshot(doc(firestore, "userChats", authUser.uid),
                async (doc) => {
                    if (doc.exists()) {
                        const userChatsData = doc.data();
                        // console.log("Fetched user chats data:", userChatsData);
                        const chattedUsersData = await Promise.all(
                            Object.entries(userChatsData).map(async ([chatId, chatData]) => {
                                const userInfo = chatData.userInfo;
                                const userDetails = await fetchUserDetails(userInfo.uid);
                                return {
                                    ...chatData,
                                    chatId,
                                    userInfo: {
                                        ...userInfo,
                                        username: userDetails?.username || "Unknown",
                                        profilePicURL: userDetails?.profilePicURL || "",
                                    },
                                };
                            })
                        );
                        // console.log(chattedUsersData)
                        setChattedUsers(chattedUsersData);
                    } else {
                        setChattedUsers([]);
                    }
                    setLoading(false);
                },
                (error) => {
                    console.error("Error fetching chatted users:", error);
                    setLoading(false);
                }
            );

            return () => {
                unsub();
            };
        };


        if(isOpen){
            fetchChattedUsers();

        }
    }, [authUser.uid, isOpen]);

    const sortedChattedUsers = useMemo(() => {
        return chattedUsers ? chattedUsers.sort((a, b) => b.date - a.date) : [];
    }, [chattedUsers]);

    return { chattedUsers: sortedChattedUsers, loading };
};

export default useChattedUsers;
