import {Box, Flex, HStack, Skeleton, SkeletonCircle, Text, useColorMode} from "@chakra-ui/react";
import React from "react";

function ChatUserItemSkeleton() {
    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    return (
        <Box py={2} px={6} w={'full'} >
            <HStack>
                <SkeletonCircle startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} minW={'56px'} w={'56px'}  h={'56px'} />

                <Flex w={'full'} direction={'column'} gap={2} display={{base:'flex',md:'none',lg:'flex'}} >
                    <Skeleton startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} borderRadius={'lg'} h={'18px'} w={'270px'} />
                    <Skeleton  startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} borderRadius={'lg'} h={'18px'} w={'200px'} />
                </Flex>
            </HStack>
        </Box>
    );
}

export default ChatUserItemSkeleton;