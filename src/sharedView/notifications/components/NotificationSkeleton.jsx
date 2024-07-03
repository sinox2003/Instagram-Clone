import React from 'react';
import {HStack, Skeleton, SkeletonCircle, SkeletonText, useColorMode} from "@chakra-ui/react";

function NotificationSkeleton() {

    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    return (
        <HStack h={"60px"} spacing={4} px={"16px"} w={"full"} py={"8px"}>
            <SkeletonCircle h={"44px"} w={"44px"} startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} />
            <Skeleton startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} flexGrow={1}  h={"17px"}  />
            <Skeleton startColor={switchMode('whiteAlpha.100','blackAlpha.100')} borderRadius={"lg"} endColor={switchMode('whiteAlpha.300','blackAlpha.300')}  w={"44px"} h={"44px"} />

        </HStack>
    );
}

export default NotificationSkeleton;