import React from 'react';
import {Box, Divider, HStack, Text, useColorMode} from "@chakra-ui/react";
import {IoIosArrowBack} from "react-icons/io";

function NotificationNavBar() {


    const {colorMode} = useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)



    return (
        <Box pos="fixed" w={"full"} display={{base:'block',md:'none'}}>
            <HStack justifyContent='center' pos='relative'>
                <IoIosArrowBack size={30} onClick={()=>history.back()}  style={{position:'absolute',left:'10px'}} />
                <Text  textAlign='center' fontWeight='640' py='10px' >Notifications</Text>

            </HStack>
            <Divider borderColor={switchMode('whiteAlpha.300','blackAlpha.300')} />

        </Box>
    );
}

export default NotificationNavBar;