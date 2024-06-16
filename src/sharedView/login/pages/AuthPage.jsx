import React from 'react';
import {Box, Flex, useColorMode} from "@chakra-ui/react";
import PhoneAnimation from "../components/PhoneAnimation.jsx";
import LogInBox from "../components/LogInBox.jsx";

function AuthPage(props) {
    const {colorMode,toggleColorMode}=useColorMode()

    return (
        
        <Flex height={'100vh'} gap={1} justifyContent={'center'} alignItems={'center'}>
            <Box display={{base:'none',lg:'block'}}>
                <PhoneAnimation />
            </Box>
            <Box >
                <LogInBox/>

            </Box>

        </Flex>
    );
}

export default AuthPage;