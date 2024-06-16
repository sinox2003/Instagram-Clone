import {usePostLikesSelector} from "../store/postLikes-store.jsx";


const usePostLikes = () => {


    const isOpen=usePostLikesSelector.use.isOpen();
    const onLikesOpen=usePostLikesSelector.use.onLikesOpen();
    const onClose=usePostLikesSelector.use.onClose();
    const postId=usePostLikesSelector.use.postId();
    const setPostId=usePostLikesSelector.use.setPostId();


    return{
        isOpen,onLikesOpen,onClose,postId,setPostId
    }


}

export default usePostLikes;