import {HStack, SkeletonCircle, SkeletonText, useColorMode} from "@chakra-ui/react";

function PostCommentSkeleton() {
    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    return (

        <HStack gap={2} py={4} px={3}  w={{base:'auto',md:'450px'}}>
            <SkeletonCircle startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')}  w={'32px'} h={'32px'} />
            <SkeletonText startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')}  w={'60%'} noOfLines={2}  />
        </HStack>


    );
}

export default PostCommentSkeleton;