import {usePostModalSelector} from "../store/postModal-store.jsx";

const usePostModal = () => {
    const isPostModalOpenOpen=usePostModalSelector.use.isOpen();
    const onOpenPostModal=usePostModalSelector.use.onOpen();

    const onClosePostModal=usePostModalSelector.use.onClose();
    const setUrl=usePostModalSelector.use.setUrl();
    const url=usePostModalSelector.use.url();



    return{isPostModalOpenOpen,onOpenPostModal,onClosePostModal,setUrl,url};

};

export default usePostModal;