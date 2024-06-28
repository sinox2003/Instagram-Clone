import {Box, Modal, ModalCloseButton, ModalOverlay, useBreakpointValue} from '@chakra-ui/react'


import usePostModal from "../../../hooks/usePostModal.jsx";
import PostBox from "../components/PostBox.jsx";
import PostBoxPhone from "../components/PostBoxPhone.jsx";


function PostModal() {

    const {isPostModalOpenOpen,onClosePostModal,url}=usePostModal()



    const close=()=>{
        onClosePostModal();
        window.history.replaceState(null, null, url)
    }

    const display=useBreakpointValue(
        {
            base: 'base',
            xs: 'xs',
            sm: 'sm',
            smd: 'smd',
            md: 'md',
            xl: 'xl',
        }
    )



    return (

        (display==='base' || display==='sm' || display==='smd' || display==='xs')?


            <Modal onOverlayClick={close} onClose={close}  isOpen={isPostModalOpenOpen} isCentered size={'full'} >

                <ModalOverlay zIndex={2000} bg={'blackAlpha.700'} />
                <Box zIndex={2000} pos={'relative'}  >


                   <PostBoxPhone close={close} />

                </Box>
            </Modal>

            :

            <Modal onOverlayClick={close} onClose={close}  isOpen={isPostModalOpenOpen} isCentered  >

                <ModalOverlay zIndex={2000} bg={'blackAlpha.700'} />
                <ModalCloseButton zIndex={2001} bg='transparent' size={'lg'} color={'white'} pos='fixed'  onClick={close} right={1}  top={1} />
                <Box zIndex={2000} pos={'relative'}  >

                    <PostBox close={close} />
                </Box>
            </Modal>

    );
}

export default PostModal;