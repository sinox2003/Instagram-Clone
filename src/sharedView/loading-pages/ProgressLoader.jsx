import {Box, Center, keyframes, Progress, Spinner} from "@chakra-ui/react";

function ProgressLoader() {
    const animationKeyframes = keyframes`
    0% { left: -100vw; }
    100% { left: 0; } 
  `;

    const animation = `${animationKeyframes} 400ms linear`;

    return (
        <>
            <Box w="100vw" h="100vh"  top={0}   animation={animation} position="absolute" overflow="hidden" zIndex={5000}>
                    <Progress
                        size="xs"
                        colorScheme="custom-gradient"
                        isIndeterminate
                        bgGradient="linear(to-r, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)"
                    />
            </Box>

            <Center w="100vw" h="100vh">
                <Spinner />
            </Center>
        </>

    );
}

export default ProgressLoader;
