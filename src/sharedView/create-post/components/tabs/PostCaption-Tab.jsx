import React from 'react';

import {Box, Center, Divider, Flex, Image, Spinner, Text, useColorMode, VStack} from "@chakra-ui/react";
import {GoArrowLeft} from "react-icons/go";
import PostCaption from "./caption-components/PostCaption.jsx";
import {usePreparePost} from "../../../../hooks/usePreparePost.jsx";
import useCreatePost from "../../../../hooks/back-end-hooks/useCreatePost.js";
import useShowToast from "../../../../hooks/useShowToast.jsx";

function PostCaptionTab({closeModal,handleSelect}) {

    const { editedImageSrc,caption} = usePreparePost();

    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);
    const showToast=useShowToast();

    const { handleCreatePost,isLoading } = useCreatePost();




    const handlePostProcess = async () => {

        if (editedImageSrc) {
            try {
                await handleCreatePost(editedImageSrc, caption);
            } catch (error) {
                showToast("Error", error.message, "error");
            }finally {
                if (!isLoading){
                    closeModal()

                }
            }
        }
    };




    return (
        <Box minW='fit-content' minH='fit-content'  borderRadius='15px'  borderBottomRadius='16px'  overflow={'clip'}>
            <Flex justifyContent='space-between' alignItems='center' py={1} px={3}>
                <GoArrowLeft size='35' cursor='pointer' onClick={() => handleSelect(2)} />
                <Text fontWeight='semibold'>Create new post</Text>
                {
                    isLoading?
                        <Spinner size='xs'/>
                        :
                        <Text fontWeight='semibold' cursor='pointer' onClick={handlePostProcess}   color='#0095F6' _hover={{ color: 'inherit' }} px={2}>Post</Text>

                }
            </Flex>
            <Divider />
            <VStack   bg={switchMode('whiteAlpha.300','blackAlpha.300')}   position='relative'  h='65vh' w={'full'}  overflow='hidden' >
                <Center h='full'  w='full%'   pos='absolute' top='0' left='0' right='0' bottom='0' >
                    <Image  src={editedImageSrc}   w='full%' h='100%' objectFit='cover'   />

                </Center>
                
                <PostCaption  />


            </VStack>
        </Box>

    );
}

export default PostCaptionTab;