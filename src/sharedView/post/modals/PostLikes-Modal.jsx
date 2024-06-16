import React, {useEffect, useState} from 'react';
import {
    Box,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useColorMode,
    VStack
} from "@chakra-ui/react";
import UserProfileItem from "../../profile/components/UserProfileItem.jsx";
import usePostLikes from "../../../hooks/usePostLikes.jsx";
import useGetLikesByPost from "../../../hooks/back-end-hooks/useGetLikesByPost.js";
import UserProfileSkeleton from "../../profile/components/UserProfileSkeleton.jsx";

function PostLikesModal() {
    const {colorMode} = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    const {isOpen, onClose, postId} = usePostLikes();


    const{isLoading,likes}=useGetLikesByPost(postId)




    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={{base: 'full', 'smd': 'md'}}>
            <ModalOverlay zIndex={2000} bg={'blackAlpha.800'}/>
            <Box zIndex={2000} pos='relative'>
                <ModalContent h={'430px'} bg={switchMode('#262626', 'white')} borderRadius={'14px'} overflow='hidden'>
                    <Text textAlign={'center'} fontWeight='640' py='10px'>Likes</Text>
                    <Divider borderColor={switchMode('whiteAlpha.300', 'blackAlpha.300')}/>
                    <ModalCloseButton bg='transparent' size={'lg'} right={'2'} top={'3px'}/>

                    <ModalBody overflowY={'auto'}>
                        <VStack spacing={0}>
                            {isLoading ? (
                                     [0, 1, 2, 3].map((i) => <UserProfileSkeleton key={i} />)
                            ) : (
                                likes.map((user) => (
                                    <UserProfileItem
                                        profilePicURL={user.profilePicURL}
                                        key={user.uid}
                                        uid={user?.uid}
                                        username={user.username}
                                        fullName={user.fullName}
                                        close={onClose}
                                    />
                                ))
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Box>
        </Modal>
    );
}

export default PostLikesModal;
