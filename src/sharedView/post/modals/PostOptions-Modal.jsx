import React, {useEffect, useState} from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogOverlay,
    Box,
    Button, Center, Spinner,
    useClipboard,
    useColorMode,
    VStack
} from "@chakra-ui/react";
import useSliderAlert from "../../../hooks/useSliderAlert.jsx";
import useFeedPostOptions from "../../../hooks/useFeedPostOptions.jsx";
import {useNavigate} from "react-router-dom";
import usePostModal from "../../../hooks/usePostModal.jsx";
import useFollowUser from "../../../hooks/back-end-hooks/useFollowUser.js";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import usePostStore from "../../../store/Backend-stores/postStore.js";
import useShowToast from "../../../hooks/useShowToast.jsx";
import {deleteObject, ref} from "firebase/storage";
import {firestore, storage} from "../../../config/firebase.js";
import useUserProfileStore from "../../../store/Backend-stores/userProfileStore.js";
import {arrayRemove, deleteDoc, doc, updateDoc} from "firebase/firestore";
import useGetUserProfileByUsername from "../../../hooks/back-end-hooks/useGetUserProfileByUsername.js";


function PostOptionsModal() {

    const cancelRef = React.useRef()
    const {colorMode} = useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const{isOpen,onClose,postOwner,posId}=useFeedPostOptions()

    const { onCopy,setValue } = useClipboard(' ')


    const {onClosePostModal}=usePostModal()

    const {setIsSliderAlertOpen}=useSliderAlert()

    const navigate=useNavigate()


    const authUser = useAuthStore((state) => state.user);
    const {userProfile,isLoading}=useGetUserProfileByUsername(postOwner)



    const visitingOwnProfileAndAuth = authUser && authUser.username === postOwner;

    const deletePost = usePostStore((state) => state.deletePost);
    const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

    const showToast = useShowToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const {isFollowing,isUpdating,loading,handleFollowUser}=useFollowUser(userProfile?.uid)


    const handleCopyLink=()=>{

        onCopy()
        setIsSliderAlertOpen(true,'Link copied to clipboard')
        onClose()

    }




    const handleGoToPost=()=>{
        navigate(`/main/p/${posId}`)
        onClose()
        onClosePostModal()
    }


    useEffect(() => {
        const newURL = window.location.href.split('main');

        setValue(`${newURL[0]}main/p/${posId}`)



    }, [posId]);


    const handleDeletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        if (isDeleting) return;

        try {
            const imageRef = ref(storage, `posts/${posId}`);
            await deleteObject(imageRef);
            const userRef = doc(firestore, "users", authUser.uid);
            await deleteDoc(doc(firestore, "posts", posId));

            await updateDoc(userRef, {
                posts: arrayRemove(posId),
            });

            deletePost(posId);
            decrementPostsCount(posId);
            setIsSliderAlertOpen(true,"Post deleted successfully")
            onClose()
            onClosePostModal()
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsDeleting(false);
        }
    };



    return (
        <AlertDialog
            motionPreset='scale'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            closeOnEsc
            isCentered
            size={{base:'xs',md:'sm'}}
        >

            <AlertDialogOverlay zIndex={2000} />
            <Box zIndex={2000} pos={'relative'}>
                <AlertDialogContent  borderRadius={'xl'}  overflow={'hidden'}  bgColor={switchMode('#292929','white')}>

                    <VStack width={'full'} spacing={0}  borderColor={switchMode('whiteAlpha.300','blackAlpha.300')}>


                        {
                            visitingOwnProfileAndAuth ?

                            <Button width={'full'} onClick={handleDeletePost} color={'#ED4856'} borderBottom={'1px'} borderRadius={0} borderColor={switchMode('#363636','#DBDBDB')} _active={{bg:switchMode('blackAlpha.300','#F0F0F0')}}  variant='unstyled' h={'50px'}     >
                            Delete post
                            </Button>
                            :
                                isUpdating ?
                                    <Center borderBottom={'1px'} borderColor={switchMode('#363636','#DBDBDB')}   h={'50px'} >
                                        <Spinner size={"sm"} />
                                    </Center>
                                    :
                                    (
                                          isFollowing ?
                                            <Button width={'full'} onClick={()=>{handleFollowUser(); onClose()}}  isLoading={isUpdating} color={'#ED4856'} borderBottom={'1px'} borderRadius={0} borderColor={switchMode('#363636','#DBDBDB')} _active={{bg:switchMode('blackAlpha.300','#F0F0F0')}}  variant='unstyled' h={'50px'}     >
                                                Unfollow
                                            </Button>
                                            :
                                            <Button width={'full'}  onClick={handleFollowUser}  isLoading={isUpdating} color={'#0095F6'} borderBottom={'1px'} borderRadius={0} borderColor={switchMode('#363636','#DBDBDB')} _active={{bg:switchMode('blackAlpha.300','#F0F0F0')}}  variant='unstyled' h={'50px'}     >
                                                Follow
                                            </Button>
                                    )


                        }


                        <Button width={'full'} borderBottom={'1px'} onClick={handleGoToPost} fontWeight={'400'} borderRadius={0} borderColor={switchMode('#363636','#DBDBDB')} _active={{bg:switchMode('blackAlpha.300','#F0F0F0')}}  variant='unstyled' h={'50px'}    >
                            Go to Post
                        </Button>
                        <Button width={'full'} borderBottom={'1px'} onClick={handleCopyLink} fontWeight={'400'} borderRadius={0} borderColor={switchMode('#363636','#DBDBDB')} _active={{bg:switchMode('blackAlpha.300','#F0F0F0')}}  variant='unstyled' h={'50px'}     >
                            Copy Link
                        </Button>


                        <Button width={'full'}  borderRadius={0} fontWeight={'400'}  _active={{bg:switchMode('blackAlpha.300','#F0F0F0')}}  variant='unstyled' h={'50px'}  ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>


                    </VStack>
                </AlertDialogContent>

            </Box>


        </AlertDialog>
    );
}

export default PostOptionsModal;