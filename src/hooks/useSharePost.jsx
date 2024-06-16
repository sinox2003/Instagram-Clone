import {useSharePostSelector} from "../store/sharePost-store.jsx";


const useSharePost = () => {


    const isOpen =useSharePostSelector.use.isOpen();
    const onShareOpen =useSharePostSelector.use.onOpen();
    const onClose =useSharePostSelector.use.onClose();
    const postId =useSharePostSelector.use.postId();
    const setSharedPostId =useSharePostSelector.use.setPostId();


    return {
        isOpen,
        onShareOpen,
        onClose,
        postId,
        setSharedPostId,
    }



}
export default useSharePost;