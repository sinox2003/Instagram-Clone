import React, {useEffect} from 'react';
import {Avatar, Box, HStack, Image, Text, useColorMode} from "@chakra-ui/react";
import useGetUserProfileById from "../../../hooks/back-end-hooks/useGetUserProfileById.js";
import {useNavigate} from "react-router-dom";
import NotificationSkeleton from "./NotificationSkeleton.jsx";
import {postTimeAgo} from "../../../utils/postTimeAgo.js";

function NotificationNewComment({notification}) {
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);
    const { userProfile, getUserProfile, isUserLoading } = useGetUserProfileById();
    const navigate=useNavigate()

    useEffect(() => {
        getUserProfile(notification.commenterId);
    }, [notification.commenterId]);

    return (
        isUserLoading ? (
            <NotificationSkeleton />
        ) : (
            <HStack
                cursor={"pointer"}
                h={"60px"}
                _hover={{ bg: switchMode('whiteAlpha.200', 'blackAlpha.200') }}
                spacing={4}
                px={"16px"}
                w={"full"}
                py={"8px"}
            >
                <Avatar h={"44px"} w={"44px"} onClick={()=>navigate(`/main/profile/${userProfile.username}`)} src={userProfile?.profilePicURL} />
                <Text flexGrow={1} w="calc(100% - 108px)"  display="flex" alignItems="baseline" flexWrap="wrap">
                    <Box fontWeight="semibold" sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} onClick={() => navigate(`/main/profile/${userProfile.username}`)} mr={1}>
                        {userProfile?.username}
                    </Box>

                    <Box fontSize="sm" sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} mr={1}>
                        commented on your post: {notification.comment}
                    </Box>
                    <Box fontSize="sm" color="gray">
                        {postTimeAgo(notification.timestamp)}
                    </Box>
                </Text>

                <Image w={"44px"} h={"44px"} onClick={()=>navigate(`/main/p/${notification.postId}`)} objectFit="cover" borderRadius={"lg"} src={notification.imageURL} />
            </HStack>
        )
    );
}

export default NotificationNewComment;