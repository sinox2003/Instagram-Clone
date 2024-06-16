import React, {useEffect, useState} from 'react';
import {
    Avatar,
    AvatarBadge,
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Stack,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import useEditProfile from "../../../hooks/back-end-hooks/useEditProfile.js";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import usePreviewImg from "../../../hooks/back-end-hooks/usePreviewImg.js";
import {useNavigate} from "react-router-dom";

function EditProfile({ isOpen, onClose }) {

    const authUser = useAuthStore((state) => state.user);

    const [inputs, setInputs] = useState({
        fullName: authUser.fullName,
        username: authUser.username,
        bio:authUser.bio,
    });

    const { handleImageChange, removeProfilePic, selectedFile, setSelectedFile } = usePreviewImg();
    const { isUpdating, editProfile } = useEditProfile();
    const navigate=useNavigate()


    const handleEditProfile = async () => {
        try {
            await editProfile(inputs, selectedFile);
            setSelectedFile(null);
            if(!isUpdating){
                onClose()
                if(inputs.username){
                    navigate(`/main/profile/${inputs.username}`)

                }

            }
        } catch (error) {
            console.error(error);
        }
    };  

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={{ base: 'full', md: 'md' }}>
            <ModalOverlay zIndex={2000} />
            <Box pos='relative' zIndex={2000}>
                <ModalContent rounded={'xl'} bg={useColorModeValue('white', '#262626')}>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack py={[1, 6]} px={[0, 4]}>
                            <Stack spacing={4} w={'full'} pb={3}>
                                <Heading fontSize={{ base: '2xl', sm: '3xl' }}>
                                    Edit Profile
                                </Heading>

                                <FormControl>
                                    <Stack direction={['column', 'row']} spacing={6}>
                                        <Center>
                                            <Avatar size="xl" bg='gray' src={selectedFile || authUser.profilePicURL}>
                                                {/*<AvatarBadge*/}
                                                {/*    as={IconButton}*/}
                                                {/*    size="sm"*/}
                                                {/*    rounded="full"*/}
                                                {/*    top="-10px"*/}
                                                {/*    onClick={removeProfilePic}*/}
                                                {/*    colorScheme="red"*/}
                                                {/*    aria-label="remove Image"*/}
                                                {/*    icon={<IoClose />}*/}
                                                {/*/>*/}
                                            </Avatar>
                                        </Center>
                                        <Center w="full">
                                            <FormLabel htmlFor='avatar' bg={useColorModeValue('blackAlpha.200', 'whiteAlpha.300')} textAlign='center' cursor={'pointer'} py={1} borderRadius={'md'} w="full">
                                                Change Icon
                                            </FormLabel>
                                            <Input type='file' onChange={handleImageChange} id='avatar' accept='image/*' display='none' />
                                        </Center>
                                    </Stack>
                                </FormControl>
                                <FormControl id="userName">
                                    <FormLabel>User name</FormLabel>
                                    <Input
                                        placeholder="UserName"
                                        _placeholder={{ color: 'gray' }}
                                        type="text"
                                        value={inputs.username || authUser.username}
                                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl id="email">
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        placeholder="FullName"
                                        _placeholder={{ color: 'gray' }}
                                        type="text"
                                        value={inputs.fullName || authUser.fullName}
                                        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl id="Bio">
                                    <FormLabel>Bio</FormLabel>
                                    <Input
                                        placeholder="Bio"
                                        _placeholder={{ color: 'gray' }}
                                        type="text"
                                        value={inputs.bio || authUser.bio}
                                        onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack spacing={6} direction={['column', 'row']} w={'full'}>
                                <Button
                                    color={useColorModeValue('white', '#262626')}
                                    bg={useColorModeValue('#262626', 'white')}
                                    w="full"
                                    onClick={onClose}
                                    _hover={{
                                        _dark: {
                                            bg: 'whiteAlpha.900',
                                        },
                                        bg: 'black',
                                    }}>
                                    Cancel
                                </Button>
                                <Button
                                    bg={'#0095F6'}
                                    color={'white'}
                                    onClick={handleEditProfile}
                                    isLoading={isUpdating}
                                    w="full"
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Submit
                                </Button>
                            </Stack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Box>
        </Modal>
    );
}

export default EditProfile;
