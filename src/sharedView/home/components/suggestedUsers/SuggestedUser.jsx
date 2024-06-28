import {Avatar, Box, Center, HStack, Spacer, Spinner, Text, useColorMode} from "@chakra-ui/react";
import useFollowUser from "../../../../hooks/back-end-hooks/useFollowUser.js";
import {useNavigate} from "react-router-dom";

function SuggestedUser({user}) {



    const {colorMode} = useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);

    const navigate=useNavigate()

    const handleClick=()=>{
        navigate("/main/profile/"+user.username)
    }


    return (

            isUpdating ?
                <Center>
                    <Spinner size={'xs'} />
                </Center>

                :
                <HStack h='60px' alignItems={'center'} py={'8px'} >
                    <HStack h='full' spacing={2}>
                        <Avatar cursor='pointer' w='44px' h='44px' onClick={handleClick} src={user?.profilePicURL} />
                        <Box  h='full' >
                            <Text fontWeight='semibold' h='18px' cursor='pointer' sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'170px'} onClick={handleClick} fontSize='sm' >{user?.username}</Text>
                            <Text fontSize='12px' h='18px'  color='#737373' >Suggested for you</Text>
                        </Box>
                    </HStack>

                    <Spacer />

                    <Text fontWeight='semibold' cursor='pointer' color='#50AAF8' onClick={handleFollowUser } _hover={{color:switchMode('white','#40638B')}} fontSize='xs'>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
                </HStack>



    );
}

export default SuggestedUser;