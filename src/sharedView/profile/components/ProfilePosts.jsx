import { Box, Center, Grid, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { HiOutlineCamera } from "react-icons/hi";
import { useParams } from "react-router-dom";
import ProfilePost from "./ProfilePost.jsx";
import useGetUserPosts from "../../../hooks/back-end-hooks/useGetUserPosts.js";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import {useEffect, useRef} from "react";
import {useInView} from "react-intersection-observer";

function ProfilePosts() {
    // const { getPostsByUsername, isLoading, userPosts } = useDummyPosts();
    const params = useParams();
    const authUser=useAuthStore((state)=>state.user)
    const{posts,arePostsLoading,getNextPosts,isNextLoading,isInfiniteScrolling}=useGetUserPosts(params.username)

    const{inView,ref}=useInView()
    // const topRef=useRef()

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
                params.username===authUser.username ?
                    <VStack w='full' pt={45}>
                        <Box border='1px' borderColor='#272727' borderRadius='50%' p={2}>
                            <HiOutlineCamera size={45} color='#272727' strokeWidth={1} />
                        </Box>
                        <Heading size={'lg'} fontWeight={'extrabold'}>Share Photos</Heading>
                        <Text fontSize={'sm'} color='gray'>Share your first photo by clicking on create at the sidebar</Text>
                    </VStack>
                    :
                    <VStack w='full' pt={45}>

                        <Heading size={'lg'} fontWeight={'extrabold'}>No Posts Found</Heading>
                    </VStack>

            ) : (
                <>
                    <Grid templateColumns='repeat(3, 1fr)' gap={1}>
                        {posts.map((post) => (
                            <ProfilePost key={post.id} post={post} />
                        ))}
                    </Grid>
                    <Center py={10}  ref={ref}>
                        {   isInfiniteScrolling!==0 && (
                            isNextLoading &&
                            <Spinner />
                        )

                        }
                    </Center>
                </>

            )
        )
    );
}

export default ProfilePosts;
