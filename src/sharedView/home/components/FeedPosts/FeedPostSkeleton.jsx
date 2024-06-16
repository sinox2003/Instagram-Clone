import {HStack, Skeleton, SkeletonCircle, useColorMode, VStack} from "@chakra-ui/react";

function FeedPostSkeleton() {
    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    return (

        <VStack maxW={"470px"} w={{ base: "full", smd: "470px" }} mb={'100px'}>
            <HStack w={'full'}  >
                <SkeletonCircle  startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} w={'35px'}  />
                <VStack spacing={1} alignItems={'start'} w={'full'}  >
                    <Skeleton startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} h={'13px'} w={'50%'} borderRadius={'4px'} />

                </VStack>
            </HStack>
            <Skeleton startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} h={'400px'} w={'100%'} borderRadius={'sm'} />

        </VStack>
    );
}

export default FeedPostSkeleton;