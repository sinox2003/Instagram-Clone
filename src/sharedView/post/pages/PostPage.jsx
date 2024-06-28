import {Box, Center, Flex, IconButton, Spinner, useColorMode, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IoIosArrowBack} from "react-icons/io";
import PostHeader from "../components/PostHeader.jsx";
import PostComments from "../components/PostComments.jsx";
import PostFooter from "../components/PostFooter.jsx";
import FeedPost from "../../home/components/FeedPosts/FeedPost.jsx";
import useGetPostById from "../../../hooks/back-end-hooks/useGetPostById.js";
import useGetUserProfileById from "../../../hooks/back-end-hooks/useGetUserProfileById.js";
import useGetCommentsByPost from "../../../hooks/back-end-hooks/useGetCommentsByPost.js";

function PostPage() {


    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [aspectRatio, setAspectRatio] = useState(1);
    const [newSize, setNewSize] = useState({ width: 0, height: 0 });
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    const navigate = useNavigate();

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
        return <Center h={'80vh'} w={'full'}>
            <Spinner />
        </Center>
    }

    return (
        <>
            <Center w={'full'} display={{ base: 'none', md: 'flex' }}>
                <Center height={'100vh'} w={'full'}>
                    <Flex maxW={{ base: '100%', xl: newSize.width }} maxH={newSize.height} border={'1px'} borderColor={switchMode('whiteAlpha.300', 'blackAlpha.300')}>
                        <Box bg={'black'} borderRight={'1px'} borderColor={switchMode('whiteAlpha.300', 'blackAlpha.300')}>
                            <img
                                src={post?.imageURL}
                                style={{
                                    objectFit: 'contain',
                                    width: '100%',
                                    height: '100%',
                                }}
                                alt={post.id}
                            />
                        </Box>
                        <VStack minW={'450px'} h={'full'}>
                            <PostHeader post={post} user={userProfile} isLoading={isUserLoading} />
                            <VStack w={'full'} flexGrow={1} h={`calc(${newSize.height}px - 61px)`}>
                                <PostComments closeModal={close} id={id} comments={comments} isLoading={areCommentsLoading} />
                                <PostFooter post={post} id={id} user={userProfile} refresh={getComments} />
                            </VStack>
                        </VStack>
                    </Flex>
                </Center>
            </Center>
            <Center w={'full'} display={{ base: 'flex', md: 'none' }}>
                <Box w={'full'} pos={'fixed'} zIndex={2000} py={'10px'} top={0} borderBottom={'1px'} borderColor={switchMode('whiteAlpha.300', 'blackAlpha.300')} bg={switchMode('black', 'white')}>
                    <IconButton
                        variant='link'
                        onClick={() => navigate(-1)}
                        pos={'fixed'}
                        color={switchMode('white', 'black')}
                        _hover={{ transform: 'scale(1.05)', '& svg': { strokeWidth: '2.5' } }}
                        transition={'all ease 0.2s'}
                        icon={<IoIosArrowBack size={27} />}
                        aria-label={'go back'}
                    />
                    <Center>Posts</Center>
                </Box>
                <Center py={'20%'} height={'fit-content'} w={'full'}>
                    <FeedPost post={post} />
                </Center>
            </Center>
        </>
    );
}

export default PostPage;
