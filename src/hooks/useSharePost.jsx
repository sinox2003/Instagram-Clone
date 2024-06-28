import {useSharePostSelector} from "../store/sharePost-store.jsx";


const useSharePost = () => {


    const isOpen =useSharePostSelector.use.isOpen();
    const onShareOpen =useSharePostSelector.use.onOpen();
    const onClose =useSharePostSelector.use.onClose();
    const message =useSharePostSelector.use.message();
    const setSharedMessage =useSharePostSelector.use.setMessage();
    const image =useSharePostSelector.use.image();
    const setSharedImage =useSharePostSelector.use.setImage();


    return {
        isOpen,
        onShareOpen,
        onClose,
        message,
        setSharedMessage,
        image,
        setSharedImage,
    }



}
export default useSharePost;