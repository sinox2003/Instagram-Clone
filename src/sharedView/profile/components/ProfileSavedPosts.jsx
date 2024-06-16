import {useEffect} from 'react';
import useDummyPosts from "../../../hooks/useDummyPosts.jsx";
import {Box, Center, Grid, Heading, Spinner, Text, VStack} from "@chakra-ui/react";
import {HiOutlineCamera} from "react-icons/hi";
import ProfilePost from "./ProfilePost.jsx";
import {useParams} from "react-router-dom";
import {LuBookMarked} from "react-icons/lu";
import useGetSavedPosts from "../../../hooks/back-end-hooks/useGetSavedPosts.js";
import usePostStore from "../../../store/Backend-stores/postStore.js";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import useGetLikedPosts from "../../../hooks/back-end-hooks/useGetLikedPosts.js";
import {useInView} from "react-intersection-observer";

function ProfileSavedPosts() {




    // const { getSavedPostsByUsername, isLoading, userPosts } = useDummyPosts();

    const authUser=useAuthStore((state)=>state.user)

    const params = useParams();
    const { posts, isInfiniteScrolling, arePostsLoading,isNextLoading,getNextPosts}=useGetSavedPosts(params.username)
    const{inView,ref}=useInView()




    useEffect(() => {
        // console.log(inView)

        if (isInfiniteScrolling !== 0 && inView) {
            getNextPosts();
        }

    }, [inView]);



    return (
        arePostsLoading ? (
            <Center pt={5} w='full'>
                <Spinner />
            </Center>
        ) : (
            !arePostsLoading && posts.length === 0 ? (
                <VStack w='full' pt={45}>
                    {/*<Box border='1px' borderColor='#272727' borderRadius='50%' p={2}>*/}
                        <LuBookMarked size={45} color='#272727' strokeWidth={1} />
                    {/*</Box>*/}
                    <Heading size={'lg'} fontWeight={'extrabold'}>Save posts</Heading>
                    <Text fontSize={'sm'} color='gray'>Click on save in order to see all your saved posts</Text>
                </VStack>
            ) : (
                <>
                    <Grid templateColumns='repeat(3, 1fr)' gap={1}>
                        {posts.map((post) => (
                            <ProfilePost key={post.id} post={post} />
                        ))}
                    </Grid>
                    <Center py={10}  ref={ref}>
                        {
                            isNextLoading &&
                            <Spinner />


                        }
                    </Center>
                </>
            )
        )
    );

}

export default ProfileSavedPosts;