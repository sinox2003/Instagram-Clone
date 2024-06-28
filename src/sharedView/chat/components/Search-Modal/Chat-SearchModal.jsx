import {
    Box,
    Divider,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useColorMode,
    VStack,
} from '@chakra-ui/react'
import React, {useRef} from "react";
import useSearchUser from "../../../../hooks/back-end-hooks/useSearchUser.js";
import ChatSearchItems from "./Chat-SearchItems.jsx";


function ChatSearchModal({isOpen,onClose}) {

    const searchReference = useRef();
    const {colorMode}=useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const{isLoading,getUserProfile,user,setUser}=useSearchUser()

    const handleClose=()=>{
        setUser([])
        onClose()
    }


    const handleSearch=()=>{

        let query=searchReference.current.value
        if(query.length>0){
            getUserProfile(query)
        }else {
            setUser([])
        }


    }


    return (

        <Modal onClose={handleClose} isOpen={isOpen} isCentered size={{ base: 'full', smd: 'md' }}>
            <ModalOverlay zIndex={3000} bg={'blackAlpha.800'} onClose={handleClose} />
            <Box zIndex={3000} pos='relative'>
                <ModalContent h={'430px'} bg={switchMode('#262626', 'white')} borderRadius={'14px'} overflow='hidden'>
                    <Text textAlign={'center'} fontWeight='640' py='10px'>
                        New Message
                    </Text>
                    <Divider borderColor={switchMode('whiteAlpha.400', 'blackAlpha.400')} />
                    <ModalCloseButton bg='transparent' size={'lg'} right={'2'} top={'3px'} />

                    <InputGroup h={'35px'} w={'full'}  my={1} >
                        <InputLeftElement  h={'full'} >
                            <Text fontWeight='640' >
                                To:
                            </Text>
                        </InputLeftElement>
                        <Input

                            placeholder='Search...'
                            h={'full'}
                            ml={3}
                            size={'sm'}
                            borderWidth={0}
                            borderRadius={'lg'}
                            onChange={handleSearch}
                            ref={searchReference}
                            _placeholder={{ fontWeight: 'light', color: switchMode('whiteAlpha.600', 'blackAlpha.600') }}

                            focusBorderColor='transparent'
                        />

                    </InputGroup>
                    <Divider borderColor={switchMode('whiteAlpha.400', 'blackAlpha.400')} />

                    <ModalBody overflowY={'auto'}  p={0}>
                        <VStack spacing={0} >
                            <ChatSearchItems handleClose={handleClose} isSearchLoading={isLoading} searchedUsers={user} />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Box>
        </Modal>
    );
}

export default ChatSearchModal;