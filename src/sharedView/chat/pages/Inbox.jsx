import {Box, Button, Center, Text, useDisclosure, VStack} from "@chakra-ui/react";

import {PiMessengerLogoLight} from "react-icons/pi";

import PhoneChatUsersList from "../components/PhoneChat-UsersList.jsx";
import ChatSearchModal from "../components/Search-Modal/Chat-SearchModal.jsx";

function Inbox() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Center  display={{base:'none',md:'flex'}} w={'full'} >
                <VStack spacing={4} >
                    <Box border={'2px'} p={5} borderRadius={'50%'}>
                        <PiMessengerLogoLight size={55} strokeWidth={0}/>
                    </Box>
                    <VStack spacing={1}>
                        <Text fontSize={'20px'}>
                            Your messages
                        </Text>
                        <Text color={'#bdbdbd'} mb={3} fontSize={'sm'}>
                            Send a message to start a chat.
                        </Text>
                        <Button  h={'32px'} onClick={onOpen} color={'white'} fontSize={'13px'} bg={'#0095F6'} _hover={{bg:'#0064d1'}} _active={{bg:'#284866'}} borderRadius={'lg'} px={5} >Send message</Button>
                    </VStack>

                </VStack>
            </Center>

            {/*     //////////////////   phone  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}


          <PhoneChatUsersList />

            <ChatSearchModal isOpen={isOpen} onClose={onClose}/>

        </>

    );
}

export default Inbox;