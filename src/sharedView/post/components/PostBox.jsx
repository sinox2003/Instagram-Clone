import {useEffect, useState} from 'react';
import {Box, Center, Flex, ModalContent, Spinner, useColorMode, VStack} from "@chakra-ui/react";
import PostHeader from "./PostHeader.jsx";
import PostFooter from "./PostFooter.jsx";
import PostComments from "./PostComments.jsx";
import useGetPostById from "../../../hooks/back-end-hooks/useGetPostById.js";
import useGetUserProfileById from "../../../hooks/back-end-hooks/useGetUserProfileById.js";
import useGetCommentsByPost from "../../../hooks/back-end-hooks/useGetCommentsByPost.js";

function PostBox({close}) {

    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [aspectRatio, setAspectRatio] = useState(1);
    const [newSize, setNewSize] = useState({ width: 0, height: 0 });
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);


    const{post,isLoading,getPost}=useGetPostById()
    const {userProfile,isUserLoading,getUserProfile}=useGetUserProfileById()

    const newURL = window.location.href.split('/');
    const id = newURL[newURL.length - 1];
    const{areCommentsLoading,fetchComments,comments}=useGetCommentsByPost()

    useEffect(() => {


        getPost(id);
        getComments()
    }, []);

    useEffect(() => {
        getUserProfile(post?.createdBy)

    },[post])





    const getComments=()=>{
        fetchComments(id)
    }



    useEffect(() => {
        if (post?.imageURL ) {
            const img = new Image();
            img.src = post?.imageURL ;
            img.onload = () => {
                const { naturalWidth, naturalHeight } = img;
                setImageSize({ width: naturalWidth, height: naturalHeight });

                const aspectRatio = naturalWidth / naturalHeight;
                setAspectRatio(aspectRatio);

                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;

                const maxWidth = screenWidth * 0.9; // You can adjust this factor as needed
                const maxHeight = screenHeight * 0.8; // You can adjust this factor as needed
                const adjustedMaxWidth = maxHeight * aspectRatio + 450;

                setNewSize({ width: Math.min(maxWidth, adjustedMaxWidth), height: maxHeight });
            };
        }
    }, [post?.imageURL ,isLoading]);

    if (!post?.imageURL  || !imageSize.width || !imageSize.height || isLoading
    ) {
        return <Center w={'100vw'}>
            <Spinner />
        </Center>;
    }


    return (
        <ModalContent maxW={newSize.width} maxH={newSize.height} bg={switchMode('black', 'white')}>
            <Flex maxW={newSize.width} maxH={newSize.height}>
                <Box
                    maxH={newSize.height}
                    flexBasis={`calc(${newSize.width}px - 450px)`}
                    maxW={`calc(${newSize.width}px - 450px)`}
                    bg={'black'}
                >
                    <img
                        src={post?.imageURL }
                        style={{
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%'
                        }}
                        alt={post.id}
                    />
                </Box>


                <VStack minW={'450px'} h={'full'} borderLeft={'1px'} borderColor={switchMode('whiteAlpha.200','blackAlpha.200')}>
                    <PostHeader  id={id} post={post} user={userProfile} isLoading={isUserLoading} />

                    <VStack w={'full'} flexGrow={1} h={`calc(${newSize.height}px - 61px)`}>
                        <PostComments closeModal={close} id={id} comments={comments} isLoading={areCommentsLoading} />
                        <PostFooter post={post} id={id} user={userProfile} refresh={getComments} />
                    </VStack>
                </VStack>
            </Flex>
        </ModalContent>
    );
}

export default PostBox;



