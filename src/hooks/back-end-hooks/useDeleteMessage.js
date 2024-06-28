import { useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { firestore } from '../../config/firebase.js';
import useAuthStore from '../../store/Backend-stores/authStore.js';

const useDeleteMessage = () => {
    const [loading, setLoading] = useState(false);

    const authUser = useAuthStore((state) => state.user);

    const deleteMessage = async (chatId, messageId) => {
        setLoading(true);

        try {
            const chatDocRef = doc(firestore, 'chats', chatId);

            // Get the current chat document
            const chatDoc = await getDoc(chatDocRef);
            const chatData = chatDoc.data();

            // Find the message to be deleted
            const messageToDelete = chatData.messages.find(msg => msg.id === messageId);

            // Check if the message has an img attribute
            if (messageToDelete && messageToDelete.img) {
                const storage = getStorage();
                const imgRef = ref(storage, messageToDelete.img);

                // Delete the image from Firebase Storage
                await deleteObject(imgRef);
                console.log('Image deleted from storage');
            }

            // Filter out the message to be deleted
            const updatedMessages = chatData.messages.filter(msg => msg.id !== messageId);

            // Update the chat document with the filtered messages
            await updateDoc(chatDocRef, {
                messages: updatedMessages,
            });

            // Check if the deleted message was the last message
            if (chatData.messages[chatData.messages.length - 1].id === messageId) {
                // Get the latest message after deletion
                const latestMessage = updatedMessages.length > 0 ? updatedMessages[updatedMessages.length - 1] : { text: "" };

                let myLatestMessage = latestMessage.text;
                let userLatestMessage = latestMessage.text;

                if (latestMessage.text!=="" && latestMessage.text.startsWith(window.location.origin+"/main/p")) {
                    myLatestMessage = "You sent an attachment";
                    userLatestMessage = `${authUser.username} sent an attachment`;
                } else if (latestMessage.text==="" && latestMessage.img) {
                    myLatestMessage = "You sent an image";
                    userLatestMessage = `${authUser.username} sent an image`;
                }

                // Get the other user's ID
                const otherUserId = chatId.replace(authUser.uid, '');


                // Update the last message and timestamp for both users
                await updateDoc(doc(firestore, "userChats", authUser.uid), {
                    [`${chatId}.lastMessage`]: {text:myLatestMessage},
                    [`${chatId}.date`]: latestMessage.date || new Date(),
                });

                await updateDoc(doc(firestore, "userChats", otherUserId), {
                    [`${chatId}.lastMessage`]: {text:userLatestMessage},
                    [`${chatId}.date`]: latestMessage.date || new Date(),
                });

                console.log('Check if the deleted message was the last message')
            }

            console.log('Message deleted');
        } catch (err) {
            console.error('Error deleting message:', err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteMessage, loading };
};

export default useDeleteMessage;
