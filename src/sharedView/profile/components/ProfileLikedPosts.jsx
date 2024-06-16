import {useEffect} from 'react';
import useDummyPosts from "../../../hooks/useDummyPosts.jsx";
import {Box, Center, Grid, Heading, Spinner, Text, VStack} from "@chakra-ui/react";
import ProfilePost from "./ProfilePost.jsx";
import {useParams} from "react-router-dom";

import {LuFolderHeart} from "react-icons/lu";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import useGetLikedPosts from "../../../hooks/back-end-hooks/useGetLikedPosts.js";
import {useInView} from "react-intersection-observer";

function ProfileLikedPosts() {


    const authUser=useAuthStore((state)=>state.user)

    const params = useParams();
    const { posts, isInfiniteScrolling, arePostsLoading,isNextLoading,getNextPosts}=useGetLikedPosts(params.username)
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
                    params.username ===authUser.username ?
                        <VStack w='full' pt={45}>
                            <LuFolderHeart size={45} color='#272727' strokeWidth={1.3} />
                            <Heading size={'lg'} fontWeight={'extrabold'}>Like Posts</Heading>
                            <Text fontSize={'sm'} color='gray'>Like posts in order to see all your liked posts </Text>
                        </VStack>
                        :
                        <VStack w='full' pt={45}>

                            <Heading size={'lg'} fontWeight={'extrabold'}>No Liked Posts Found</Heading>
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

export default ProfileLikedPosts;