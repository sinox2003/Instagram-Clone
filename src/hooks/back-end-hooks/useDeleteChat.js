// useDeleteChat.js
import {useState} from 'react';
import {doc, updateDoc} from "firebase/firestore";
import {firestore} from "../../config/firebase.js";
import useAuthStore from "../../store/Backend-stores/authStore.js";

const useDeleteChat = () => {
    const [loading, setLoading] = useState(false);

    const authUser = useAuthStore((state) => state.user);

    const clearChatContent = async (chatId, user) => {
        setLoading(true);

        try {
            const chatDocRef = doc(firestore, "chats", chatId);

            // Clear the chat messages by setting the 'messages' array to empty
            await updateDoc(chatDocRef, {
                messages: [],
            });

            // Update the last message and timestamp for both users
            await updateDoc(doc(firestore, "userChats", authUser.uid), {
                [`${chatId}.lastMessage`]: {
                    text: "",
                },
                [`${chatId}.date`]: Date.now(),
            });

            await updateDoc(doc(firestore, "userChats", user.uid), {
                [`${chatId}.lastMessage`]: {
                    text: "",
                },
                [`${chatId}.date`]: Date.now(),
            });

            console.log(`Chat content with ID ${chatId} cleared successfully`);
        } catch (err) {
            console.error("Error clearing chat content:", err);

        } finally {
            setLoading(false);
        }
    };

    return { clearChatContent, loading };
};

export default useDeleteChat;
