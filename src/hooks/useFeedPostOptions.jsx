import {usePostOptionsSelector} from "../store/postOptions-store.jsx";


const useFeedPostOptions = () => {

    const isOpen=usePostOptionsSelector.use.isOpen();
    const onOpen=usePostOptionsSelector.use.onOpen();
    const onClose=usePostOptionsSelector.use.onClose();
    const posId=usePostOptionsSelector.use.postId();
    const setPostId=usePostOptionsSelector.use.setPostId();
    const postOwner=usePostOptionsSelector.use.postOwner();
    const setPostOwner=usePostOptionsSelector.use.setPostOwner();



    return {
        isOpen,
        onOpen,
        onClose,
        posId,
        setPostId,
        postOwner,
        setPostOwner,
    }


};

export default useFeedPostOptions;