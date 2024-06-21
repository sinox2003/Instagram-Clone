import { useEffect, useRef } from 'react';
import {Box, Button, Center, Spinner, Text, VStack} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useGetAllPosts from "../../../hooks/back-end-hooks/useGetAllPosts";
import FeedPostSkeleton from "../../home/components/FeedPosts/FeedPostSkeleton";
import FeedPost from "../../home/components/FeedPosts/FeedPost";
import {useInView} from "react-intersection-observer";

function ExplorePosts() {
    const { isLoading, posts, getNextPosts, isNextLoading,latestDoc,isInfiniteScrolling } = useGetAllPosts();
    const{inView,ref}=useInView()

    useEffect(() => {
        // console.log(inView)

        if (isInfiniteScrolling !== 0 && inView) {
                getNextPosts();
        }

    }, [inView]);





    return (
        <VStack flex={2}  id={"container"}  py={10} spacing={6}>
            {isLoading ? (
                [0, 1, 2, 3].map((key) => (
                    <FeedPostSkeleton key={key} />
                ))
            ) : (
                posts.length > 0 ? (
                    posts.map((post, key) => (
                        <FeedPost key={key} post={post} />
                    ))
                ) : (
                    <Center mt={'10vh'} flexDirection={'column'}>
                        <Text fontSize={'lg'}>
                            You are following no one
                        </Text>
                        <Text fontWeight={'semibold'} color={'#4FABFA'}>
                            <Link to={'/main/explore'}>
                                Explore new accounts
                            </Link>
                        </Text>
                    </Center>
                )
            )}
            <Box   ref={ref}>
                {   isInfiniteScrolling!==0 && (
                    isNextLoading &&
                    <Spinner />
                )

                }
            </Box>
        </VStack>
    );
}

export default ExplorePosts;
