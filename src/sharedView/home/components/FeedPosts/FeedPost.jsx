import {VStack} from "@chakra-ui/react";
import FeedPostHeader from "./FeedPostHeader.jsx";
import FeedPostImage from "./FeedPostImage.jsx";
import FeedPostFooter from "./FeedPostFooter.jsx";
import {useEffect, useState} from "react";
import FeedPostSkeleton from "./FeedPostSkeleton.jsx";
import useGetUserProfileById from "../../../../hooks/back-end-hooks/useGetUserProfileById.js";

function FeedPost({ post }) {
    const [doubleClickLike, setDoubleClickLike] = useState(false);

    const {isUserLoading, userProfile, getUserProfile}=useGetUserProfileById()


    useEffect(() => {
        getUserProfile(post.createdBy)
    }, []);


    const doubleClick = (value) => {
        setDoubleClickLike(value);
    };



    if (isUserLoading ) {
        return   <FeedPostSkeleton />


    }

    return (
        <VStack maxW={"470px"} w={{ base: "full", smd: "470px" }}>
            <FeedPostHeader post={post}  user={userProfile} />
            <FeedPostImage setDoubleClickLike={doubleClick} post={post} />
            <FeedPostFooter post={post} id={post.id} doubleClickLike={doubleClickLike} setDoubleClickLike={doubleClick} user={userProfile} />
        </VStack>
    );
}

export default FeedPost;
