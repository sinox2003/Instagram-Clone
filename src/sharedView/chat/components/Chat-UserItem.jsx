import {Avatar, Box, Flex, HStack, Text, useColorMode} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import useGetUserProfileById from "../../../hooks/back-end-hooks/useGetUserProfileById.js";
import ChatUserItemSkeleton from "./Chat-UserItemSkeleton.jsx";
import {timeAgo} from "../../../utils/timeAgo.js";

function ChatUserItem({userId,myId,date,lastMessage}) {

    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    const [combinedId, setCombinedId] = useState()
    const {isUserLoading,getUserProfile,userProfile}=useGetUserProfileById()


    useEffect(() => {
        getUserProfile(userId)

    }, []);

    useEffect(() => {

        setCombinedId(myId > userId ? myId + userId : userId + myId)
    }, [userId]);





    return (
        isUserLoading ?
            <ChatUserItemSkeleton />
        :
        <NavLink to={`d/${combinedId}`} style={{width:'100%'}}  >

            {({ isActive }) => (
                <HStack py={2} px={6} justifyContent={{base:'center',lg:'start'}} w={'full'} cursor={'pointer'} bg={isActive && switchMode('#262626','#EFEFEF') }
                            _hover={{ backgroundColor: switchMode('whiteAlpha.100','blackAlpha.50') }}
                           >
            <HStack  >
                <Avatar w={'56px'} h={'56px'} src={userProfile?.profilePicURL} >
                    {/*<AvatarBadge boxSize='1em' bottom={1} right={1} borderColor={switchMode('black','white')} bg='#19D14F' />*/}
                </Avatar>
                <Flex w={'full'} direction={'column'} display={{base:'none',lg:'block'}} >
                    <Text fontSize={'15px'} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'240px'} >
                        {userProfile?.username}
                    </Text>

                        <Text fontSize={'xs'} color={'#bdbdbd'}  display="flex" alignItems="center">
                            <Box
                                sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: '1',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                                maxW={'210px'}
                                mr={1} // Add margin-right for spacing between elements
                            >
                                {lastMessage}
                            </Box>
                            {lastMessage && `• ${timeAgo(date)}`}
                        </Text>






                </Flex>
            </HStack>
        </HStack>
            )}

        </NavLink>
    );
}

export default ChatUserItem;