import {Avatar, Box, HStack, Spacer, Text, useColorMode, useDisclosure} from "@chakra-ui/react";
import useAuthStore from "../../../../store/Backend-stores/authStore.js";
import LogOut from "../../../log-out/LogOut.jsx";
import {useNavigate} from "react-router-dom";

function SuggestedHeader() {


    const {colorMode} = useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const authUser=useAuthStore((state)=>state.user)
    const navigate=useNavigate()

    const handleClick=()=>{
        navigate("/main/profile/"+authUser.username)
    }


    return (
        <HStack h='44px' alignItems={'center'}  >
            <HStack h='full' spacing={2}>
                <Avatar cursor='pointer' w='44px' h='44px' onClick={handleClick} src={authUser.profilePicURL} />
                <Box  h='full' >
                    <Text fontWeight='semibold' sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'170px'} h='18px' cursor='pointer' onClick={handleClick} fontSize='sm' >{authUser.username}</Text>
                    <Text fontSize='13px' h='18px'  color='#737373' >{authUser.fullName}</Text>
                </Box>
            </HStack>

            <Spacer />
            <Text fontWeight='semibold' cursor='pointer' color='#50AAF8' onClick={onOpen} _hover={{color:switchMode('white','#40638B')}} fontSize='xs'>Log out</Text>
            <LogOut isOpen={isOpen}  onClose={onClose} />
        </HStack>
    );
}

export default SuggestedHeader;