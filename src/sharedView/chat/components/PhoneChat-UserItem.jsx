import {NavLink} from "react-router-dom";
import {Avatar, Box, Flex, HStack, Text, useColorMode} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import useGetUserProfileById from "../../../hooks/back-end-hooks/useGetUserProfileById.js";
import PhoneChatUserItemSkeleton from "./PhoneChat-UserItemSkeleton.jsx";
import {timeAgo} from "../../../utils/timeAgo.js";

function PhoneChatUserItem({userId,myId,lastMessage,date}) {

    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

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
                    <HStack overflow={'hidden'}>
                        <Avatar w={'56px'} h={'56px'} src={userProfile?.profilePicURL} >
                            {/*<AvatarBadge boxSize='1em' bottom={1} right={1} borderColor={switchMode('black','white')} bg='#19D14F' />*/}
                        </Avatar>
                        <Flex w={'full'} direction={'column'} >
                            <Text fontSize={'15px'} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'calc(100% - 40px)'} >
                                {userProfile?.username}
                            </Text>
                            {/*<Text fontSize={'xs'} color={'#bdbdbd'} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'full'}>*/}
                            {/*    {lastMessage}*/}
                            {/*</Text>*/}
                            <Text fontSize={'xs'} color={'#bdbdbd'}  display="flex" alignItems="center">
                                <Box
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: '1',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}
                                    maxW={'calc(100% - 120px)'}
                                    mr={1} // Add margin-right for spacing between elements
                                >
                                    {lastMessage}
                                </Box>
                                {lastMessage && `• ${timeAgo(date)}`}
                            </Text>
                        </Flex>
                    </HStack>
                </Box>
            )}

        </NavLink>
    );
}

export default PhoneChatUserItem;