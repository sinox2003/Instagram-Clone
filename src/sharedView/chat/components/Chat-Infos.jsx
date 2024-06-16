import React from 'react';
import {
    Avatar,
    Box,
    Divider,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay, Spinner,
    Text, useColorMode
} from "@chakra-ui/react";
import {GoArrowLeft} from "react-icons/go";
import {useNavigate} from "react-router-dom";
import useDeleteChat from "../../../hooks/back-end-hooks/useDeleteChat.js";

function ChatInfos({isOpen,onClose,user,chatId}) {

    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    const navigate=useNavigate()
    const {clearChatContent,loading}=useDeleteChat()

    const checkUser=()=>{
        navigate(`/main/profile/${user.username}`)
    }

    const handleDeleteChat=async ()=>{
        await clearChatContent(chatId,user)
        if(!loading){
            onClose()
        }

    }

    return (
        <Modal
            isCentered
            onClose={onClose}
            size={{base:'full',md:'md'}}
            isOpen={isOpen}
            motionPreset='slideInBottom'
        >
            <ModalOverlay zIndex={5000} />
            <Box zIndex={5000} pos='relative' >
                <ModalContent  h={'430px'} bg={switchMode('black','white')} border={'1px solid'} borderColor={switchMode('whiteAlpha.400','blackAlpha.400')}  overflow='hidden' >
                    <HStack justifyContent={'center'} pos='relative'>
                        <GoArrowLeft size={29} strokeWidth={0.2} onClick={onClose} cursor={'pointer'} style={{position:'absolute',left:'15px'}} />
                        <Text  textAlign='center' fontWeight='640' py='10px' >Chat infos</Text>

                    </HStack>
                    <Divider borderColor={switchMode('whiteAlpha.400','blackAlpha.400')} />



                    <ModalBody  h={'full'} px={4}  overflowY={'auto'} >
                        <Text fontWeight={'semibold'} mb={3}>Members</Text>
                        <HStack spacing={3}  py={1}  >
                            <Avatar w={'44px'} h={'44px'} onClick={checkUser} src={user?.profilePicURL} cursor={'pointer'} />
                            <Text fontWeight={'semibold'} onClick={checkUser} cursor={'pointer'} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'200px'} >{user?.username}</Text>

                        </HStack>
                    </ModalBody>
                    <Divider borderColor={switchMode('whiteAlpha.400','blackAlpha.400')} />
                    <ModalFooter justifyContent={'start'}>
                        {
                            loading ?
                                <Spinner />
                                :
                                <Text cursor={'pointer'} onClick={handleDeleteChat} color={'#ED4932'} >
                                    Delete Chat
                                </Text>
                        }

                    </ModalFooter>

                </ModalContent>
            </Box>

        </Modal>
    );
}

export default ChatInfos;