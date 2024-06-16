import {Box, Center, Spinner, Text, VStack} from "@chakra-ui/react";
import FeedPost from "./FeedPost.jsx";
import {useEffect, useRef} from "react";
import FeedPostSkeleton from "./FeedPostSkeleton.jsx";
import {Link} from "react-router-dom";
import useGetFeedPosts from "../../../../hooks/back-end-hooks/useGetFeedPosts.js";
import {useInView} from "react-intersection-observer";

function FeedPosts() {



    const{posts,isLoading,isNextLoading,isInfiniteScrolling,getNextFeedPosts} =useGetFeedPosts()
    const topRef=useRef()

    const{inView,ref}=useInView()

    useEffect(() => {
        // console.log(inView)

        if (isInfiniteScrolling !== 0 && inView) {

            getNextFeedPosts();
        }

    }, [inView]);


    useEffect(() => {
        topRef.current.scrollIntoView();

    }, []);


    return (
        <VStack flex={2} ref={topRef} py={10} spacing={6}>
            {isLoading  ? (
                [0,1,2,3].map((key) =>
                    <FeedPostSkeleton key={key} />
                )
            ) : (
                posts.length > 0 ?
                posts.map((post, key) => (
                    <FeedPost key={key} post={post}  />
                ))
                    :
                    <Center mt={'10vh'}  flexDirection={'column'}  >
                        <Text fontSize={'lg'}>
                            you are following no one
                        </Text>
                        <Text fontWeight={'semibold'}  color={'#4FABFA'} >
                            <Link to={'/main/explore'}>
                                Explore new accounts

                            </Link>
                        </Text>
                    </Center>
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

export default FeedPosts;
