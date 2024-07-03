import React, {useEffect} from 'react';
import {Avatar, Box, Button, HStack, Image, Text, useColorMode} from "@chakra-ui/react";
import useGetUserProfileById from "../../../hooks/back-end-hooks/useGetUserProfileById.js";
import {useNavigate} from "react-router-dom";
import NotificationSkeleton from "./NotificationSkeleton.jsx";
import {postTimeAgo} from "../../../utils/postTimeAgo.js";
import useFollowUser from "../../../hooks/back-end-hooks/useFollowUser.js";
import useAuthStore from "../../../store/Backend-stores/authStore.js";

function NotificationNewFollower({notification}) {
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);
    const { userProfile, getUserProfile, isUserLoading } = useGetUserProfileById();
    const navigate=useNavigate()
    const authUser = useAuthStore((state) => state.user);

    const {isFollowing,isUpdating,handleFollowUser}=useFollowUser(notification?.followerId)

    const visitingOwnProfileAndAuth = authUser && authUser.uid === notification?.followerId;

    useEffect(() => {
        getUserProfile(notification.followerId);
    }, [notification.followerId]);

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
                    <Box fontSize="sm" mr={1}>
                        started following you.
                    </Box>
                    <Box fontSize="sm" color="gray">
                        {postTimeAgo(notification.timestamp)}
                    </Box>
                </Text>
                {
                    visitingOwnProfileAndAuth ?
                            <></>
                        :
                        (
                            isFollowing ?
                                    <Button size='sm' px='6' onClick={handleFollowUser} maxW={'80%'} isLoading={isUpdating} bg={switchMode('whiteAlpha.300', 'blackAlpha.200')} _hover={{ bg: `${switchMode('whiteAlpha.200', 'blackAlpha.300')}` }} fontWeight='semibold'>Unfollow</Button>
                                :
                                    <Button size='sm' px='6' onClick={handleFollowUser} maxW={'80%'} isLoading={isUpdating} bg={'#0095F6'} _hover={{ bg: `#0064e0` }} color={'white'} fontWeight='semibold'>Follow</Button>
                        )

                }
            </HStack>
        )
    );
}

export default NotificationNewFollower;