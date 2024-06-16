import {HStack, SkeletonCircle, SkeletonText, useColorMode} from "@chakra-ui/react";


function UserProfileSkeleton() {
    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    return (
        <HStack w='full' h={'60px'} justifyContent={'start'} >
            <HStack w='full' >
                <SkeletonCircle startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.200','blackAlpha.200')} size='44px'  />

                <SkeletonText startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.200','blackAlpha.200')}  noOfLines={2} spacing='2' skeletonHeight='3'  w='75%'  borderRadius='4px' />
            </HStack>
        </HStack>
    );
}

export default UserProfileSkeleton;