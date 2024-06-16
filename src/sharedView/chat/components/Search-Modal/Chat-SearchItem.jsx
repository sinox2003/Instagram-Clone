import {Avatar, Box, HStack, Text, useColorMode} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function ChatSearchItem({user,handleSelect}) {

    const {colorMode}=useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const navigate=useNavigate()

    const handleClick=()=>{
        handleSelect(user)
    }


    return (
        <>
            <Box px={5} py={2} _hover={{bg: switchMode('whiteAlpha.200','blackAlpha.100')}} onClick={handleClick} cursor={'pointer'} w={'full'} >
                <HStack as='section' spacing={3}>
                    <Avatar  w='44px' height='44px' src={user?.profilePicURL} />
                    <Box maxH={'44px'}>
                        <Text fontSize='md' fontWeight='semibold' sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'full'} >{user?.username}</Text>
                        <Text fontSize='sm'  color={switchMode('whiteAlpha.700','blackAlpha.700')}>{user?.fullName} . {user?.followers.length} </Text>
                    </Box>
                </HStack>

            </Box>
        </>
    );
}

export default ChatSearchItem;