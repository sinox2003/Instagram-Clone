import {NavLink} from "react-router-dom";
import {Avatar, AvatarBadge, Box, Flex, HStack, Text, useColorMode} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {postTimeAgo} from "../../../utils/postTimeAgo.js";
import {timeAgo} from "../../../utils/timeAgo.js";
import useChatStore from "../../../store/Backend-stores/chatStore.js";
import useGetUserProfileById from "../../../hooks/back-end-hooks/useGetUserProfileById.js";
import PhoneChatUserItemSkeleton from "./PhoneChat-UserItemSkeleton.jsx";

function PhoneChatUserItem({userId,myId,lastMessage}) {

    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    const setSelectedUser = useChatStore((state) => state.setUser);

    const [combinedId, setCombinedId] = useState()
    const {isUserLoading,getUserProfile,userProfile}=useGetUserProfileById()


    useEffect(() => {

        getUserProfile(userId)

    }, []);

    useEffect(() => {

        setCombinedId(myId > userId? myId + userId: userId+ myId)

    }, [userId]);




    return (

        isUserLoading ?
            <PhoneChatUserItemSkeleton />
            :

        <NavLink to={`/main/chat/d/${combinedId}`} style={{width:'100%'}} >

            {({ isActive }) => (
                <Box py={1} px={4} w={'full'} cursor={'pointer'} bg={isActive && switchMode('#262626','#EFEFEF') }
                     _hover={{ backgroundColor: switchMode('whiteAlpha.100','blackAlpha.50') }}
                >
                    <HStack>
                        <Avatar w={'56px'} h={'56px'} src={userProfile?.profilePicURL} >
                            {/*<AvatarBadge boxSize='1em' bottom={1} right={1} borderColor={switchMode('black','white')} bg='#19D14F' />*/}
                        </Avatar>
                        <Flex w={'full'} direction={'column'} >
                            <Text fontSize={'15px'} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'full'} >
                                {userProfile?.username}
                            </Text>
                            <Text fontSize={'xs'} color={'#bdbdbd'} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'full'}>
                                {lastMessage}
                            </Text>
                        </Flex>
                    </HStack>
                </Box>
            )}

        </NavLink>
    );
}

export default PhoneChatUserItem;