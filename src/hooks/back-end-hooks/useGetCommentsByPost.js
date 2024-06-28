import {useState} from 'react';
import {doc, getDoc} from 'firebase/firestore';
import useShowToast from '../useShowToast.jsx';
import {firestore} from '../../config/firebase.js';

const useGetCommentsByPost = (postId) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();

        const fetchComments = async (postId) => {
            setIsLoading(true);
            try {
                const postDoc = await getDoc(doc(firestore, 'posts', postId));
                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setComments(postData.comments || []);
                } else {
                    showToast('Error', 'Post not found', 'error');
                }
            } catch (error) {
                showToast('Error', error.message, 'error');
            } finally {
                setIsLoading(false);
            }
        };


    return { comments, areCommentsLoading:isLoading,fetchComments };
};

export default useGetCommentsByPost;
