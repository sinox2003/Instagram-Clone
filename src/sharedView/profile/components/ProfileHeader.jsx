import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Center,
    Divider,
    Flex,
    HStack,
    SkeletonCircle,
    SkeletonText,
    Text,
    useColorMode,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import EditProfile from "./EditProfile.jsx";
import Followers from "./Followers.jsx";
import Following from "./Following.jsx";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import useFollowUser from "../../../hooks/back-end-hooks/useFollowUser.js";


function ProfileHeader({user,isUserLoading}) {
    const params = useParams();
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    const { onOpen, isOpen, onClose } = useDisclosure();
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);


    const authUser = useAuthStore((state) => state.user);

    const {isFollowing,isUpdating,handleFollowUser}=useFollowUser(user?.uid)

    const visitingOwnProfileAndAuth = authUser && authUser.username === user?.username;








    return (

        <Box width={'full'} pt={8}>
            <Flex alignItems='center' px={{ base: 4, md: 8 }} gap={{ base: '30', md: '11%', sxl: '105px' }}>
                <SkeletonCircle isLoaded={!isUserLoading} w={{ base: '77px', md: '150px' }} h='auto'>
                    <Avatar w={{ base: '77px', md: '150px' }} bg={'#DBDBDB'} h={{ base: '77px', md: '150px' }} src={user?.profilePicURL} />
                </SkeletonCircle>
                <Center minH={{ base: '77px', md: '150px' }}>
                    <SkeletonText isLoaded={!isUserLoading} noOfLines={2} w={'100%'}>
                        <Flex direction='column' gap='3'>
                            <Flex gap={{ base: 3, md: 6 }} direction={{ base: 'column', md: 'row' }}>
                                <Text fontSize="larger" maxW={{base:"200px",md:'400px'}} fontWeight="semibold" sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                                    {user?.username}
                                </Text>
                                {
                                    visitingOwnProfileAndAuth ?
                                        <Button size='sm' px='6' onClick={onOpen} bg={switchMode('whiteAlpha.300', 'blackAlpha.200')} _hover={{ bg: `${switchMode('whiteAlpha.200', 'blackAlpha.300')}` }} maxW={'80%'} fontWeight='semibold'>Edit profile</Button>
                                        :
                                        (
                                          isFollowing ?
                                              <Button size='sm' px='6' onClick={handleFollowUser} maxW={'80%'} isLoading={isUpdating} bg={switchMode('whiteAlpha.300', 'blackAlpha.200')} _hover={{ bg: `${switchMode('whiteAlpha.200', 'blackAlpha.300')}` }} fontWeight='semibold'>Unfollow</Button>
                                              :
                                              <Button size='sm' px='6' onClick={handleFollowUser} maxW={'80%'} isLoading={isUpdating} bg={'#0095F6'} _hover={{ bg: `#0064e0` }} color={'white'} fontWeight='semibold'>Follow</Button>

                                        )

                                }
                                <EditProfile onClose={onClose} isOpen={isOpen} />
                            </Flex>

                            <VStack display={{ base: 'none', md: 'block' }}>
                                <Flex gap='9'>
                                    <HStack>
                                        <Text fontWeight='semibold'>{user.posts?.length || 0}</Text>
                                        <Text fontSize={'sm'}>posts</Text>
                                    </HStack>
                                    {
                                        user.followers?.length ?
                                            <HStack cursor={'pointer'} onClick={() => setIsFollowersModalOpen(true)}>
                                                <Text fontWeight='semibold'>{user.followers?.length} </Text>
                                                <Text fontSize={'sm'}>followers</Text>
                                            </HStack>
                                            :
                                            <HStack  >
                                                <Text fontWeight='semibold'>0</Text>
                                                <Text fontSize={'sm'}>followers</Text>
                                            </HStack>
                                    }
                                    {
                                        user.following?.length?
                                            <HStack cursor={'pointer'} onClick={() => setIsFollowingModalOpen(true)}>
                                                    <Text fontWeight='semibold'>{user.following?.length} </Text>
                                                <Text fontSize={'sm'}>following</Text>
                                            </HStack>
                                            :
                                            <HStack  >
                                                <Text fontWeight='semibold'>0</Text>
                                                <Text fontSize={'sm'}>following</Text>
                                            </HStack>
                                    }

                                </Flex>
                                <Text fontSize='small' my={1} fontWeight='bold'>{user?.fullName}</Text>
                                <Text fontSize='small'>{user.bio}</Text>
                            </VStack>
                        </Flex>
                    </SkeletonText>
                </Center>
            </Flex>

            <Box display={{ base: 'block', md: 'none' }}>
                    <Text pt={6} pl={4} width='60%' fontSize='small' fontWeight='bold'>{user.fullName}</Text>
                    <Text pt={2} pl={4} width='60%' fontSize='small'>{user.bio}</Text>

                <Divider mt={9} borderColor={switchMode('whiteAlpha.500', 'blackAlpha.400')} />

                <Center justifyContent='space-around' py={2}>
                    <VStack spacing='0' w='60'>
                        <Text fontWeight='semibold'>{user.posts?.length || 0}</Text>
                        <Text fontSize={'sm'} color='gray'>posts</Text>
                    </VStack>
                    {  user.followers?.length ?
                        <VStack spacing='0' w='60' cursor='pointer' onClick={() => setIsFollowersModalOpen(true)}>
                            <Text>{user.followers?.length }</Text>
                            <Text fontSize={'sm'} color='gray'>followers</Text>
                        </VStack>
                        :
                        <VStack spacing='0' w='60'>
                            <Text> 0</Text>
                            <Text fontSize={'sm'} color='gray'>followers</Text>
                        </VStack>

                    }
                    {
                        user.following?.length?
                            <VStack spacing='0' w='60' cursor='pointer' onClick={() => setIsFollowingModalOpen(true)}>
                                <Text>{user.following?.length }</Text>
                                <Text fontSize={'sm'} color='gray'>following</Text>
                            </VStack>
                            :
                            <VStack spacing='0' w='60' >
                                <Text>0</Text>
                                <Text fontSize={'sm'} color='gray'>following</Text>
                            </VStack>
                    }

                </Center>
            </Box>

            <Followers isOpen={isFollowersModalOpen} onClose={() => setIsFollowersModalOpen(false)} />
            <Following isOpen={isFollowingModalOpen} onClose={() => setIsFollowingModalOpen(false)} />
        </Box>
    );
}

export default ProfileHeader;
