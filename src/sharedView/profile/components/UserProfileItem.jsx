import {Avatar, Box, Button, HStack, Spacer, Text, useColorMode} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import React from "react";
import useFollowUser from "../../../hooks/back-end-hooks/useFollowUser.js";
import useAuthStore from "../../../store/Backend-stores/authStore.js";

function UserProfileItem({username,fullName,profilePicURL,close,uid}) {

    const {colorMode} = useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    const navigate=useNavigate()

    const {isFollowing,isUpdating,handleFollowUser}=useFollowUser(uid)

    const authUser = useAuthStore((state) => state.user);


    const visitingOwnProfileAndAuth = authUser && authUser.username === username;


    const handleClick=()=>{
        navigate(`/main/profile/${username}`)
        close()
    }



    return (
        <HStack w='full' h={'60px'} >
          <HStack w='full' >
                  <Avatar  w='44px' height='44px' src={profilePicURL}  cursor={'pointer'} onClick={handleClick}  />
                  <Box maxH={'44px'}  >
                      <Text fontSize='sm' lineHeight={'18px'} fontWeight='semibold' cursor={'pointer'} onClick={handleClick} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={{base:'140px',md:'200px'}}  >{username}</Text>
                      <Text fontSize='sm' lineHeight={'18px'}  color={switchMode('whiteAlpha.700','blackAlpha.700')} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={{base:'140px',md:'200px'}}>{fullName}</Text>
                  </Box>
          </HStack>
            <Spacer />
            {  visitingOwnProfileAndAuth?
                <></>
                :
                (isFollowing  ?
                <Button size='sm' px='7' onClick={handleFollowUser} isLoading={isUpdating}  h={'34px'} borderRadius={'lg'}  bg={switchMode('whiteAlpha.300', 'blackAlpha.200')} _hover={{ bg: `${switchMode('whiteAlpha.200', 'blackAlpha.300')}` }} fontWeight='semibold'>Following</Button>
            :
                <Button size='sm' px='7' borderRadius={'lg'} onClick={handleFollowUser} isLoading={isUpdating}   bg={'#0095F6'} color='white' _hover={{ bg: `#0064e0` }} fontWeight='semibold'>Follow</Button>)

            }

        </HStack>
    );
}

export default UserProfileItem;