import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import useShowToast from '../useShowToast.jsx';
import { firestore } from '../../config/firebase.js';

const useGetCommentsByPost = (postId) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();

    useEffect(() => {
        if (!postId) return;

        const postDocRef = doc(firestore, 'posts', postId);

        const unsubscribe = onSnapshot(postDocRef, (postDoc) => {
            if (postDoc.exists()) {
                const postData = postDoc.data();
                setComments(postData.comments || []);
                setIsLoading(false);
            } else {
                showToast('Error', 'Post not found', 'error');
                setIsLoading(false);
            }
        }, (error) => {
            showToast('Error', error.message, 'error');
            setIsLoading(false);
        });

        // Cleanup on unmount
        return () => unsubscribe();
    }, [postId]);

    return { comments, areCommentsLoading: isLoading };
};

export default useGetCommentsByPost;
